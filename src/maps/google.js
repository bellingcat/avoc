class Google {
    /**
     * @param {Object} module
     */
    constructor(module) {
        
    }

    /**
     * @param {String} id
     * @param {Coords} coords
     * @param {Object} options
     * @returns
     */
    async loadMap(id, coords, options = {}) {
        const { Map } = await google.maps.importLibrary("maps");
        return new Map(
            document.getElementById(id),
            {
                center: coords,
                zoom: 16,
                mapTypeId: "satellite",
                streetViewControl: false,
                ...options
            }
        );
    }

    /**
     * @param {String} id
     * @param {Coords} coords
     * @param {Number} heading
     * @param {Object} options
     * @returns
     */
    async loadAerialMap(id, coords, heading = 0, options = {}) {
        return this.loadMap(
            id,
            coords,
            {
                zoom: 18,
                minZoom: 14,
                heading: heading,
                zoomControl: false,
                mapTypeControl: false,
                scaleControl: false,
                rotateControl: false,
                fullscreenControl: true,
                ...options
            }
        );
    }

    /**
     * @param {String} id
     * @param {Coords} coords
     * @param {Object} options
     * @returns
     */
    async loadStreetView(id, coords, options = {}) {
        const { StreetViewPanorama } = await google.maps.importLibrary("streetView");
        return new StreetViewPanorama(
            document.getElementById(id),
            {
                position: coords,
                pov: {
                    heading: 0,
                    pitch: 0,
                },
                panControl: false,
                ...options
            }
        );
    }
}

define("maps/google", ["module"], function() {
    return new Google(...arguments);
});