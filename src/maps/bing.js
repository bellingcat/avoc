class Bing {
    /**
     * @param {Object} module 
     */
    constructor(module) {
        this.apiKey = module.config().apiKey;
        require(["http://www.bing.com/api/maps/mapcontrol"]);
    }

    /**
     * @param {Number} id 
     * @param {Coords} coords 
     * @param {Object} options 
     * @returns
     */
    loadAerialMap(id, coords, heading, options = {}) {
        Microsoft.Maps.GlobalConfig.dynamicProperties.sessionKey = this.apiKey;
        const map = new Microsoft.Maps.Map(document.getElementById(id), {
            credentials: this.apiKey,
            mapTypeId: Microsoft.Maps.MapTypeId.birdseye,
            zoom: 18,
            heading: heading,
            center: new Microsoft.Maps.Location(coords.lat, coords.lng),
            ...options
        });
        
        return map;
    }

    /**
     * @param {Number} id 
     * @param {Coords} coords 
     * @param {Object} options 
     * @returns
     */
    loadStreetView(id, coords, heading, options = {}) {
        Microsoft.Maps.GlobalConfig.dynamicProperties.sessionKey = this.apiKey;
        const map = new Microsoft.Maps.Map(document.getElementById(id), {
            credentials: this.apiKey,
            mapTypeId: Microsoft.Maps.MapTypeId.streetside,
            zoom: 18,
            heading: heading,
            center: new Microsoft.Maps.Location(coords.lat, coords.lng),
            ...options
        });

        map.setOptions({
            streetsideOptions: {
                overviewMapMode: Microsoft.Maps.OverviewMapMode.hidden,
                showCurrentAddress: false,
                showProblemReporting: false,
                showExitButton: false,
                disablePanoramaNavigation: false,
                showHeadingCompass: true,
                showZoomButtons: true
            }
        });
        
        return map;
    }
}

define("maps/bing", ["module"], function() {
    return new Bing(...arguments);
});