/**
 * This module is responsible for the business logic of the app.
 */
define("services/elevation", ["module"],
function(module) {
    return {
        grab: async function(coords) {
            const url = module.config().endpoint
                .replace("$lat", coords.lat)
                .replace("$lng", coords.lng);

            const response = await fetch(url);
            const data = await response.json();

            return data.results[0].elevation + 'm';
        },
    }
});