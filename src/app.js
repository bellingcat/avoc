/**
 * Init
 */
requirejs.config({
    baseUrl: 'src',
    paths: {
        module: 'modules',
        lib: 'libs',
        provider: 'providers',
    }
});

requirejs(['module/main'], function(main) {
    (async () => {
        await main.init();
    })();
    
    // Workaround for Alpine's reference problem
    window.main = main;

    requirejs(['lib/alpine']);
});