define("maps/azure", ["module", "libs/atlas"], function(module, atlas) {
    
    return {
        initMap: function(id, coords, options = {}) {
            const map = new atlas.Map(id, {
                center: [coords.lng, coords.lat],
                zoom: 14,
                language: 'en-US',
                authOptions: {
                    authType: 'subscriptionKey',
                    subscriptionKey: module.config().apiKey
                },
                ...options
            });

            map.controls.add([
                new atlas.control.ZoomControl(),
                new atlas.control.CompassControl(),
                new atlas.control.PitchControl(),
                new atlas.control.StyleControl()
            ], {
                position: "bottom-left"
            });

            return map;
        },
        initAerialMap: function(id, coords, heading = 0, options = {}) {
            const map = new atlas.Map(id, {
                center: [coords.lng, coords.lat],
                style: 'satellite',
                zoom: 16,
                minZoom: 14,
                bearing: heading,
                pitch: 60,
                language: 'en-US',
                authOptions: {
                    authType: 'subscriptionKey',
                    subscriptionKey: module.config().apiKey
                },
                ...options
            });

            return map;
        },
    }
});