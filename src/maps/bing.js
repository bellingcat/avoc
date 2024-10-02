class Bing {
    /**
     * @param {Object} module 
     */
    constructor(module) {
        this.apiKey = module.config().apiKey;
    }

    /**
     * @param {Number} id 
     * @param {Coords} coords 
     * @param {Object} options 
     * @returns
     */
    loadBirdseyeMap(id, coords, heading, options = {}) {
        Microsoft.Maps.GlobalConfig.dynamicProperties.sessionKey = this.apiKey;
        
        const location = new Microsoft.Maps.Location(coords.lat, coords.lng);
        const map = new Microsoft.Maps.Map(document.getElementById(id), {
            credentials: this.apiKey,
            mapTypeId: Microsoft.Maps.MapTypeId.birdseye,
            zoom: 18,
            heading: heading,
            center: location,
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

        Microsoft.Maps.getIsBirdseyeAvailable(location, Microsoft.Maps.Heading.north, function(isAvailable) {
            if(!isAvailable) {
                map.setMapType(Microsoft.Maps.MapTypeId.aerial);
            }
        });

        return map;
    }

    /**
     * @param {Number} id 
     * @param {Coords} coords 
     * @param {Object} options 
     * @returns
     */
    loadStreetMap(id, coords, heading, options = {}) {
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

define("maps/bing", [
    "module",
    "https://www.bing.com/api/maps/mapcontrol"
], function() {
    // Workaround for a known Bing Maps V8 Web Control error
    window.sj_evt = undefined;
    
    return new Bing(...arguments);
});