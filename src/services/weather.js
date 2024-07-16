/**
 * This module is responsible for the business logic of the app.
 */
define("services/weather", ["module"], function (module) {
    return {
        WMOcodes: {
            0:  { name: "Sunny" },
            1:  { name: "Mainly Sunny" },
            2:  { name: "Partly Cloudy" },
            3:  { name: "Cloudy" },
            45: { name: "Foggy" },
            48: { name: "Rime Fog" },
            51: { name: "Light Drizzle" },
            53: { name: "Drizzle" },
            55: { name: "Heavy Drizzle" },
            56: { name: "Light Freezing Drizzle" },
            57: { name: "Freezing Drizzle" },
            61: { name: "Light Rain" },
            63: { name: "Rain" },
            65: { name: "Heavy Rain" },
            66: { name: "Light Freezing Rain" },
            67: { name: "Freezing Rain" },
            71: { name: "Light Snow" },
            73: { name: "Snow" },
            75: { name: "Heavy Snow" },
            77: { name: "Snow Grains" },
            80: { name: "Light Showers" },
            81: { name: "Showers" },
            82: { name: "Heavy Showers" },
            85: { name: "Light Snow Showers" },
            86: { name: "Snow Showers" },
            95: { name: "Thunderstorm" },
            96: { name: "Light Thunderstorms With Hail" },
            99: { name: "Thunderstorm With Hail" },
        },
        grab: async function(coords) {
            const url = module.config().endpoint
                .replace("$lat", coords.lat)
                .replace("$lng", coords.lng);

            const response = await fetch(url);
            const data = await response.json();

            return {
                elevation: data.elevation + "m",
                precipitation: data.current.precipitation + data.current_units.precipitation,
                cloudCover: data.current.cloud_cover + data.current_units.cloud_cover,
                windSpeed10m: data.current.wind_speed_10m + data.current_units.wind_speed_10m,
                windDirection10m: data.current.wind_direction_10m + data.current_units.wind_direction_10m,
                temperature2m: data.current.temperature_2m + data.current_units.temperature_2m,
                WMOcode: this.WMOcodes[data.current.weather_code].name,
                lastUpdate: data.current.time + " " + data.timezone,
            };
        },
    };
});
