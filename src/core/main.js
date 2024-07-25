/**
 * This module is responsible for the business logic of the app.
 */
define("core/main",
[
    "module",
    "core/router",
    "core/services",
    "core/maps",
    "core/shortcuts",
    "core/translations",
],
function(module, router, services, maps, shortcuts, translations) {

    (async () => {
        await router.init();
    })();
    
    return {
        services: services,
        translations: translations[module.config().language],
        maps: maps,
        shortcuts: shortcuts,

        load: function() {
            this.maps.load(router.getCoordinates());
        }
    }
});