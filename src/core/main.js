/**
 * This module is responsible for the business logic of the app.
 */
define("core/main",
[
    "core/router",
    "core/services",
    "core/maps",
    "core/shortcuts",
],
function(router, services, maps, shortcuts) {

    (async () => {
        await router.init();
    })();
    
    return {
        services: services,
        maps: maps,
        shortcuts: shortcuts,

        load: function() {
            this.maps.load(router.getCoordinates());
        }
    }
});