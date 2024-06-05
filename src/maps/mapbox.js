define("maps/mapbox", ["module", "libs/mapbox-gl"], function(module, mapboxgl) {

    mapboxgl.accessToken = module.config().apiKey;
    
    return {
        initMap: function(id, coords, options = {}) {
            const map = new mapboxgl.Map({
                container: id,
                style: 'mapbox://styles/mapbox/streets-v12',
                center: [coords.lng, coords.lat],
                zoom: 16
            });
            map.addControl(new mapboxgl.FullscreenControl());
            map.addControl(new mapboxgl.NavigationControl({
                visualizePitch: true
            }));

            return map;
        },
        init3DMap: function(id, coords, options = {}) {
            const map = this.initMap(id, coords, options);
            map.on('style.load', () => {
                // Insert the layer beneath any symbol layer.
                const layers = map.getStyle().layers;
                const labelLayerId = layers.find(
                    (layer) => layer.type === 'symbol' && layer.layout['text-field']
                ).id;
        
                // The 'building' layer in the Mapbox Streets
                // vector tileset contains building height data
                // from OpenStreetMap.
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
        
                            // Use an 'interpolate' expression to
                            // add a smooth transition effect to
                            // the buildings as the user zooms in.
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
                            'fill-extrusion-opacity': 0.6
                        }
                    },
                    labelLayerId
                );
            });
        },
        init3DMapTerrain: function(id, coords, options = {}) {
            const map = this.initMap(id, coords, options);
            map.on('style.load', () => {
                map.addSource('mapbox-dem', {
                    'type': 'raster-dem',
                    'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
                    'tileSize': 512,
                    'maxzoom': 14
                });
                map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
            });
        },
        initAerialMap: async function(id, coords, heading = 0, options = {}) {

        }
    }
});