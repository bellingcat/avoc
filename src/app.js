/**
 * Init
 */
const setupCheck = function() {
    return (self.configuration && (
        self.configuration.apiKeys.google != "" ||
        self.configuration.apiKeys.azure != "" ||
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
            "core/shortcuts": {
                shortcuts: self.configuration.shortcuts
            },
            "core/router": {
                allowedKeys: ["coords"]
            },
            "core/maps": {
                screen1: {
                    id: "screen1",
                    provider: self.configuration.maps.mainMap,
                    type: "main",
                    heading: 0,
                },
                screen2: {
                    id: "screen2",
                    provider: self.configuration.maps.aerialMap,
                    type: "aerial",
                    heading: 0,
                },
                screen3: {
                    id: "screen3",
                    provider: self.configuration.maps.aerialMap,
                    type: "aerial",
                    heading: 90,
                },
                screen4: {
                    id: "screen4",
                    provider: self.configuration.maps.aerialMap,
                    type: "aerial",
                    heading: 180,
                },
                screen5: {
                    id: "screen5",
                    provider: self.configuration.maps.aerialMap,
                    type: "aerial",
                    heading: 270,
                },
                screen6: {
                    id: "screen6",
                    provider: self.configuration.maps.streetMap,
                    type: "street",
                    heading: 0,
                },
            },
            "maps/google": {
                apiKey: self.configuration.apiKeys.google
            },
            "maps/mapbox": {
                apiKey: self.configuration.apiKeys.mapbox
            },
            "maps/azure": {
                apiKey: self.configuration.apiKeys.azure
            },
            "services/weather": {
                endpoint: self.configuration.services.weather
            },
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
            await main.load();
        })();
    });
} else {
    alert("Please setup Avoc by visiting the configuration.js file");
}