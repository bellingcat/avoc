/**
 * Init
 */
const setupCheck = function() {
    return (self.configuration && (
        self.configuration.apiKeys.google != "" ||
        self.configuration.apiKeys.bing != "" ||
        self.configuration.apiKeys.mapbox != ""
    ));
}

if(setupCheck()) {
    /**
     * Configuring RequireJS
     */
    requirejs.config({
        baseUrl: "src",
        paths: {
            core: "core",
            libs: "libs",
            maps: "maps",
            services: "services"
        },
        config: {
            "core/services": {
                defaultCoords: { lat: 50.83934958273, lng: 4.341244544982925 },
                language: self.configuration.language
            },
            "core/router": {
                allowedKeys: ["coords"]
            },
            "maps/google": {
                apiKey: self.configuration.apiKeys.google
            },
            "maps/mapbox": {
                apiKey: self.configuration.apiKeys.mapbox
            },
            "services/elevation": {
                endpoint: self.configuration.services.elevation
            },
            "services/weather": {
                endpoint: self.configuration.services.weather
            }
        }
    });

    requirejs(["libs/extends"]);
    
    /**
     * Launching the app
     */
    requirejs(["core/main"], function(main) {
        self.app = main; // Workaround for Alpine's reference issue
        
        requirejs(["libs/alpine"]);

        (async () => {
            await main.init();
        })();
    });
} else {
    alert("Please setup Avoc by visiting the configuration.js file");
}