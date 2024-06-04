/**
 * Currently unused. Later, it will provide an easy way to edit configurations.
 */
define('configuration', function() {
    return {
        // In order to use one of the providers, a valid API key must be provided.
        apiKeys: {
            googleMaps: "",
            bingMaps:   "",
            mapbox:     "",
        },
        // Specify which map provider to use in each section.
        maps: {
            mainMap:   'google', // [required] possible values: googleMaps, bingMaps, mapbox
            aerialMap: 'google', // [required] possible values: googleMaps, bingMaps, mapbox
            streetMap: 'google', // [required] possible values: google, bing, mapbox
        },
        // Quick links are dinamically generated, and can be added freely.
        // Syntax:
        //      https://website.tld/path/$lat,$lng
        // Parameters:
        //      - $lat: latitude of the current position
        //      - $lng: longitude of the current position
        quickLinks: {
            twitterMedia: "https://twitter.com/search?q=geocode:$lat,$lng,1km&f=media",
            marineTraffic: "https://www.marinetraffic.com/en/ais/home/centerx:$lat/centery:$lng/zoom:12",
        },
        services: {
            elevation: "https://api.open-elevation.com/api/v1/lookup?locations=$lat,$lng", // Powered by https://www.open-elevation.com/
            weather: "https://api.open-meteo.com/v1/forecast?latitude=$lat&longitude=$lng&hourly=temperature_2m",  // Powered by https://open-meteo.com
            weather_historical: "https://archive-api.open-meteo.com/v1/archive?latitude=$lat&longitude=$lng", // Powered by https://open-meteo.com
        }
    }
});