/**
 * This module is responsible for the business logic of the app.
 */
define("core/main",
[
    "core/router",
    "core/settings",
    "core/services",
    "core/maps",
    "core/shortcuts",
],
function(router, settings, services, maps, shortcuts) {

    router.init();

    return {
        settings: settings,
        services: services,
        maps: maps,
        shortcuts: shortcuts,

        load: async function() {
            this.maps.load(await this.services.getCoordinates());
        }
    }
});