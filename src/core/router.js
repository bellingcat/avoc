/**
 * A quick and simple router.
 */
define("core/router", ["module"], function(module) {
    return {
        allowedKeys: module.config().allowedKeys,

        // Parses URL looking for allowed params and updates the state
        init: function() {
            const URLparams = new URLSearchParams(window.location.search);
            if(URLparams.size > 0) {
                const data = {};
                for(const [key, value] of URLparams.entries()) {
                    data[key] = value.isJSON()
                        ? JSON.parse(value)
                        : value;
                }
                this.pushState(data);
            }
        },
        getLocationAddress: function() {
            return window.location.protocol+"//"+window.location.pathname;
        },
        parseURLParam: function(key, val) {
            return key + "=" + (typeof val !== "string" ? JSON.stringify(val) : val);
        },
        pushState: function(data) {
            const state = {};
            const params = [];
            Object.keys(data).forEach((key) => {
                if(this.allowedKeys.indexOf(key) > -1) {
                    params.push(this.parseURLParam(key, data[key]));
                    state[key] = data[key];
                }
            });

            let address = this.getLocationAddress();
            if(params.length > 0)
                address += "?" + params.join("&");

            window.history.pushState(state, "", address);
        },
        resetState: function() {
            window.history.pushState(null, "", this.getLocationAddress());
        },
        getState: function() {
            return history.state;
        },
        getStateOf: function(key) {
            return history.state[key];
        },
        hasStateOf: function(key) {
            return history.state && history.state[key];
        }
    }
});