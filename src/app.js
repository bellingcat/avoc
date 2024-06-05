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
            "maps/google": {
                apiKey: self.configuration.apiKeys.google
            }
        }
    });
    
    /**
     * Launching the app
     */
    requirejs(["core/main"], function(main) {
        (async () => {
            await main.init();
        })();
        
        self.main = main; // Workaround for Alpine's reference issue
    
        requirejs(["libs/alpine"]);
    });
} else {
    alert("Please setup Avoc by visiting the configuration.js file");
}