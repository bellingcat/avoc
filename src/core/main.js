/**
 * This module is responsible for the business logic of the app.
 */
define("core/main",
[
    "core/router",
    "core/settings",
    "core/services",
    "core/maps",
],
function(router, settings, services, maps) {

    router.init();

    return {
        settings: settings,
        services: services,
        maps: maps,

        load: async function() {
            this.maps.load(await this.services.getCoordinates());
        },
        jumpToCoordinates: function(c) {
            if(typeof c != "string" || c == "") return;

            const coords = c.split(",");
            this.maps.screen1.map.setCenter({
                lat: parseFloat(coords[0]),
                lng: parseFloat(coords[1])
            });
        }
    }
});