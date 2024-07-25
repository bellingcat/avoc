/**
 * A quick and simple router.
 */
class Router {
    /**
     * @param {Object} module 
     * @param {*} db
     */
    constructor(module, db) {
        this.DB_KEY = "Avoc.lastCoords";

        this.db = db;
        this.allowedKeys = module.config().allowedKeys;
        this.defaultCoords = module.config().defaultCoords;
        this.locationAddress = window.location.protocol + "//" + window.location.pathname;
    }

    async init() {
        const URLparams = new URLSearchParams(window.location.search);
        if (URLparams.size > 0) {
            const data = {};
            for (const [key, value] of URLparams.entries()) {
                data[key] = this.isJSON(value)
                    ? JSON.parse(value)
                    : value;
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
            if (this.allowedKeys.indexOf(key) > -1) {
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
     * @returns {boolean}
     */
    hasStateOf(key) {
        return history.state && history.state.hasOwnProperty(key);
    }
    
    /**
     * 
     * @param {string} key 
     * @param {*} val 
     * @returns 
     */
    parseURLParam(key, val) {
        return key + "=" + (typeof val !== "string" ? JSON.stringify(val) : val);
    }

    /**
     * @param {string} s 
     * @returns {boolean}
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