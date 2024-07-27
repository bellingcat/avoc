class Azure {
    /**
     * @param {Object} module
     * @param {*} atlas
     */
    constructor(module, atlas) {
        this.apiKey = module.config().apiKey;
        this.atlas = atlas;
    }

    /**
     * @param {String} id
     * @param {Coords} coords
     * @param {Object} options
     * @returns
     */
    loadMap(id, coords, options = {}) {
        const map = new this.atlas.Map(id, {
            center: coords.toLngLat(),
            zoom: 14,
            language: 'en-US',
            authOptions: {
                authType: 'subscriptionKey',
                subscriptionKey: this.apiKey
            },
            ...options
        });

        map.controls.add([
            new this.atlas.control.ZoomControl(),
            new this.atlas.control.CompassControl(),
            new this.atlas.control.PitchControl(),
            new this.atlas.control.StyleControl()
        ], {
            position: "bottom-left"
        });

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
        const map = new this.atlas.Map(id, {
            center: coords.toLngLat(),
            style: 'satellite',
            zoom: 16,
            minZoom: 14,
            bearing: heading,
            pitch: 60,
            language: 'en-US',
            authOptions: {
                authType: 'subscriptionKey',
                subscriptionKey: this.apiKey
            },
            ...options
        });

        return map;
    }
}

define("maps/azure", ["module", "sdkAzure"], function() {
    return new Azure(...arguments);
});