requirejs.config({
    baseUrl: 'js',
    paths: {
        module: 'modules',
        lib: 'libs',
        provider: 'providers',
    }
});

requirejs(['module/avoc', 'provider/google-maps', 'module/db', 'module/router'], function(avoc, gmaps, db, router) {
    (async () => {
        const coords = router.hasParam('coords')
            ? JSON.parse(router.getParam('coords'))
            : JSON.parse(await db.get('avoc.lastCoords', '{"lat":50.8385164902119,"lng":4.375917176150372}'));

        // @TODO move logic inside module
        const map1 = await gmaps.initMap('screen1', { center: coords });
        const map2 = await gmaps.initStaticMap('screen2', { zoom: 18, minZoom: 18, center: coords });
        const map3 = await gmaps.initStaticMap('screen3', { zoom: 18, minZoom: 18, center: coords, heading: 90 });
        const map4 = await gmaps.initStaticMap('screen4', { zoom: 18, minZoom: 18, center: coords, heading: 180 });
        const map5 = await gmaps.initStaticMap('screen5', { zoom: 18, minZoom: 18, center: coords, heading: 270 });

        // @TODO move logic inside module
        map1.addListener("center_changed", () => {
            let coords = {
                lat: map1.getCenter().lat(),
                lng: map1.getCenter().lng()
            };
            map2.setCenter(coords);
            map3.setCenter(coords);
            map3.setHeading(90);
            map4.setCenter(coords);
            map4.setHeading(180);
            map5.setCenter(coords);
            map5.setHeading(270);
            
            db.set('avoc.lastCoords', coords);
            router.pushState(coords, 'coords');
        });
    })();
    
    // Workaround for Alpine's reference problem
    window.avoc = avoc;

    requirejs(['lib/alpine'])
});