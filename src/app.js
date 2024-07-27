/**
 * Configuring RequireJS
 */
const config = self.configuration;
const screens = config.screens.slice(0,7);

requirejs.config({
    baseUrl: "src",
    paths: {
        core: "core",
        libs: "libs",
        maps: "maps",
        types: "types",
        services: "services",
        sdkAzure: "https://atlas.microsoft.com/sdk/javascript/mapcontrol/3/atlas.min",
        sdkMapbox: "https://api.mapbox.com/mapbox-gl-js/v3.5.1/mapbox-gl",
    },
    config: {
        "core/router": {
            allowedParams: ["coords"],
            defaultCoords: { lat: 50.8393, lng: 4.3412 },
        },
        "core/maps": {
            screens: screens,
        },
        "services/shortcuts": {
            shortcuts: config.shortcuts
        },
        "maps/google": {
            apiKey: config.apiKeys.google
        },
        "maps/mapbox": {
            apiKey: config.apiKeys.mapbox
        },
        "maps/azure": {
            apiKey: config.apiKeys.azure
        },
    }
});

/**
 * Loading custom types
 */
require(["types/coords"]);

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
        Alpine.store("screensCount", screens.length)
        Alpine.store("maps", maps);
        Alpine.store("shortcuts", services.getShortcuts());
        Alpine.store("translations", translations.getLanguage(config.language));
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