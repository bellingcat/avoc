/**
 * A quick and simple router.
 */
define("modules/router", ["modules/db"], function(db) {
    return {
        pushState: function(data, name) {
            const address = window.location.protocol+"//"+window.location.pathname;
            const params = typeof data !== "string" ? JSON.stringify(data) : data;
            window.history.pushState(data, "", address+"?"+name+"="+params);
        },
        hasParam: function(name) {
            return new URLSearchParams(window.location.search).has(name);
        },
        getParam: function(name) {
            return new URLSearchParams(window.location.search).get(name);
        },
        pushCoordinates: function(data) {
            this.pushState(data.lat+","+data.lng, "coords");
        },
        hasValidCoordinates: function() {
            if (!this.hasParam("coords"))
                return false;

            return this.getParam("coords").match(
                new RegExp(/^[-]?([1-8]?\d(\.\d+)?|90(\.0+)?),*[-]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/)
            );
        },
        getCoordinates: async function() {
            if(this.hasValidCoordinates()) {
                const coords = this.getParam("coords").split(",");
                return {
                    lat: parseFloat(coords[0]),
                    lng: parseFloat(coords[1])
                };
            } else {
                return JSON.parse(
                    await db.get("avoc.lastCoords", '{"lat":50.8385164902119,"lng":4.375917176150372}')
                );
            }
        }
    }
});