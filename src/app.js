/**
 * Init
 */
requirejs.config({
    baseUrl: "src",
    paths: {
        modules: "modules",
        libs: "libs",
        providers: "providers",
    },
});

requirejs(["modules/main"], function(main) {
    (async () => {
        await main.init();
    })();
    
    // Workaround for Alpine"s reference problem
    self.main = main;

    requirejs(["libs/alpine"]);
});