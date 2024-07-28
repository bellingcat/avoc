/**
 * Configuring RequireJS
 */
requirejs.config({
    baseUrl: "src",
    paths: {
        core: "core",
        libs: "libs",
        maps: "maps",
        types: "types",
        services: "services",
    }
});

/**
 * Loading custom types
 */
require(["types/coords"]);

/**
 * Loading configuration from file and session
 */
(async () => {
    require(["core/configuration"], async function(configuration) {
        return await configuration.load();
    });
})();

/**
 * Injecting configuration to modules
 */
requirejs.config({
    config: {
        "core/router": {
            allowedParams: ["coords"],
            defaultCoords: { lat: 50.8393, lng: 4.3412 },
        },
        "core/maps": {
            screens: configuration.screens.slice(0,7),
        },
        "services/shortcuts": {
            shortcuts: configuration.shortcuts
        },
        "maps/google": {
            apiKey: configuration.apiKeys.google
        },
        "maps/mapbox": {
            apiKey: configuration.apiKeys.mapbox
        },
        "maps/azure": {
            apiKey: configuration.apiKeys.azure
        },
        "maps/bing": {
            apiKey: configuration.apiKeys.azure
        },
    }
});

/**
 * Launching the app
 */
require([
    "core/router",
    "core/maps",
    "core/services",
    "core/translations"
],
/**
 * 
 * @param {Router} router
 * @param {Maps} maps
 * @param {Services} services
 * @param {Translations} translations
 */
function(router, maps, services, translations) {

    /**
     * Router has to fully initialize before we can move forward
     */
    (async () => {
        await router.init();
    })();

    document.addEventListener("alpine:init", () => {
        Alpine.store("maps", maps);
        Alpine.store("shortcuts", services.getShortcuts());
        Alpine.store("translations", translations.getLanguage(configuration.language));
        Alpine.store("weather", {
            data: {},
            async refresh() {
                this.data = await services.getWeather().query();
            }
        });
    });

    /**
     * Maps are loaded only after Alpine has been initialized
     */
    require(["libs/alpine"], () => maps.load(router.getCoordinates()));
});