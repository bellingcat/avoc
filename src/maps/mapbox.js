define("maps/mapbox", ["module", "libs/mapbox-gl"], function(module, mapboxgl) {

    mapboxgl.accessToken = module.config().apiKey;
    
    return {
        initMap: function(id, coords, options = {}) {
            const map = new mapboxgl.Map({
                container: id,
                style: 'mapbox://styles/mapbox/satellite-streets-v12',
                center: [coords.lng, coords.lat],
                zoom: 16,
                ...options
            });
            map.addControl(new mapboxgl.FullscreenControl());
            map.addControl(new mapboxgl.NavigationControl({
                visualizePitch: true
            }));

            return map;
        },
        initAerialMap: function(id, coords, heading = 0, options = {}) {
            const map = this.initMap(id, coords, {
                pitch: 45,
                bearing: heading,
                ...options
            });

            map.on('style.load', () => {
                const layers = map.getStyle().layers;
                const labelLayerId = layers.find(
                    (layer) => layer.type === 'symbol' && layer.layout['text-field']
                ).id;

                map.addLayer(
                    {
                        'id': 'add-3d-buildings',
                        'source': 'composite',
                        'source-layer': 'building',
                        'filter': ['==', 'extrude', 'true'],
                        'type': 'fill-extrusion',
                        'minzoom': 15,
                        'paint': {
                            'fill-extrusion-color': '#aaa',
                            'fill-extrusion-height': [
                                'interpolate',
                                ['linear'],
                                ['zoom'],
                                15,
                                0,
                                15.05,
                                ['get', 'height']
                            ],
                            'fill-extrusion-base': [
                                'interpolate',
                                ['linear'],
                                ['zoom'],
                                15,
                                0,
                                15.05,
                                ['get', 'min_height']
                            ],
                            'fill-extrusion-opacity': 0.8
                        }
                    },
                    labelLayerId
                );
            });

            return map;
        },
    }
});