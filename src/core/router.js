/**
 * A quick and simple router.
 */
class Router {
    /**
     * @param {Object} module
     * @param {Db} db
     */
    constructor(module, db) {
        console.log('constructed');
        this.DB_KEY = "Avoc.lastCoords";

        this.db = db;
        this.allowedParams = module.config().allowedParams;
        this.defaultCoords = module.config().defaultCoords;
        this.locationAddress = window.location.protocol + "//" + window.location.pathname;
    }

    /**
     * @async
     */
    async init() {
        const params = new URLSearchParams(window.location.search);
        if(params.size > 0) {
            const data = {};
            for (const [k, v] of params.entries()) {
                data[k] = this.isJSON(v) ? JSON.parse(v) : v;
            }

            this.pushState(data);
        }

        if(!this.hasStateOf("coords")) {
            this.pushState(
                await this.db.get(this.DB_KEY, this.defaultCoords)
            );
        }
    }

    /**
     * @returns {Coords}
     */
    getCoordinates() {
        const coords = this.getStateOf("coords");
        return new Coords(coords.lat, coords.lng);
    }

    /**
     * @param {Object} data
     */
    pushState(data) {
        const state = {};
        const params = [];
        Object.keys(data).forEach((key) => {
            if (this.allowedParams.indexOf(key) > -1) {
                params.push(this.parseURLParam(key, data[key]));
                state[key] = data[key];
            }
        });

        let address = this.locationAddress;
        if (params.length > 0)
            address += "?" + params.join("&");

        window.history.pushState(state, "", address);

        if(typeof data.coords !== undefined)
            this.db.set(this.DB_KEY, data.coords);
    }

    /**
     * @returns {Object}
     */
    getState() {
        return history.state;
    }

    /**
     * @returns {*}
     */
    getStateOf(key) {
        return history.state ? history.state[key] : null;
    }

    /**
     * @returns {Boolean}
     */
    hasStateOf(key) {
        return history.state && history.state.hasOwnProperty(key);
    }
    
    /**
     * 
     * @param {String} key 
     * @param {*} val 
     * @returns 
     */
    parseURLParam(key, val) {
        return key + "=" + (typeof val !== "string" ? JSON.stringify(val) : val);
    }

    /**
     * @param {String} s 
     * @returns {Boolean}
     */
    isJSON(s) {
        if (/^\s*$/.test(s)) return false;
        s = s.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@');
        s = s.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']');
        s = s.replace(/(?:^|:|,)(?:\s*\[)+/g, '');
        return (/^[\],:{}\s]*$/).test(s);
    }
}

define("core/router", ["module", "core/db"], function() {
    return new Router(...arguments);
});