class Mapbox {
    /**
     * @param {Object} module
     * @param {*} mapboxgl
     */
    constructor(module, mapboxgl) {
        this.mapboxgl = mapboxgl;
        this.mapboxgl.accessToken = module.config().apiKey;
    }

    /**
     * @param {String} id
     * @param {Coords} coords
     * @param {Object} options
     * @returns
     */
    loadMap(id, coords, options = {}) {
        const map = new this.mapboxgl.Map({
            container: id,
            style: 'mapbox://styles/mapbox/satellite-streets-v12',
            center: coords.toLngLat(),
            zoom: 16,
            ...options
        });
        map.addControl(new this.mapboxgl.FullscreenControl());
        map.addControl(new this.mapboxgl.NavigationControl({
            visualizePitch: true
        }));

        return map;
    }

    /**
     * @param {String} id
     * @param {Coords} coords
     * @param {Number} heading
     * @param {Object} options
     * @returns
     */
    loadAerialMap(id, coords, heading = 0, options = {}) {
        const map = this.loadMap(id, coords, {
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
    }
}

define("maps/mapbox", ["module", "sdkAzure"], function() {
    return new Mapbox(...arguments);
});