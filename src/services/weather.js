/**
 * This module is responsible for the business logic of the app.
 */
define("services/weather", ["module"], function (module) {
    return {
        grab: async function(coords) {
            const url = module.config().endpoint
                .replace("$lat", coords.lat)
                .replace("$lng", coords.lng);

            const response = await fetch(url);
            const data = await response.json();

            return {
                elevation: data.elevation + "m",
                precipitation: data.current.precipitation + data.current_units.precipitation,
                cloud_cover: data.current.cloud_cover + data.current_units.cloud_cover,
                wind_speed_10m: data.current.wind_speed_10m + data.current_units.wind_speed_10m,
                wind_direction_10m: data.current.wind_direction_10m + data.current_units.wind_direction_10m,
                temperature_2m: data.current.temperature_2m + data.current_units.temperature_2m,
                label: "<i class=\"fa-solid " + this.WMOcodes[data.current.weather_code].icon + "\"></i>"
                    + " <strong>WMO Label:</strong> " 
                    + this.WMOcodes[data.current.weather_code].name 
                    + " | <strong>Last update:</strong> " 
                    + data.current.time + " " + data.timezone,
            };
        },
        WMOcodes: {
            0:  { name: "Sunny",                         icon: "fa-sun" },
            1:  { name: "Mainly Sunny",                  icon: "fa-cloud-sun" },
            2:  { name: "Partly Cloudy",                 icon: "fa-cloud-sun" },
            3:  { name: "Cloudy",                        icon: "fa-cloud" },
            45: { name: "Foggy",                         icon: "fa-water" },
            48: { name: "Rime Fog",                      icon: "fa-water" },
            51: { name: "Light Drizzle",                 icon: "fa-water" },
            53: { name: "Drizzle",                       icon: "fa-water" },
            55: { name: "Heavy Drizzle",                 icon: "fa-water" },
            56: { name: "Light Freezing Drizzle",        icon: "fa-water" },
            57: { name: "Freezing Drizzle",              icon: "fa-water" },
            61: { name: "Light Rain",                    icon: "fa-cloud-rain" },
            63: { name: "Rain",                          icon: "fa-cloud-rain" },
            65: { name: "Heavy Rain",                    icon: "fa-cloud-rain" },
            66: { name: "Light Freezing Rain",           icon: "fa-snowflake" },
            67: { name: "Freezing Rain",                 icon: "fa-snowflake" },
            71: { name: "Light Snow",                    icon: "fa-snowflake" },
            73: { name: "Snow",                          icon: "fa-snowflake" },
            75: { name: "Heavy Snow",                    icon: "fa-snowflake" },
            77: { name: "Snow Grains",                   icon: "fa-snowflake" },
            80: { name: "Light Showers",                 icon: "fa-cloud-rain" },
            81: { name: "Showers",                       icon: "fa-cloud-rain" },
            82: { name: "Heavy Showers",                 icon: "fa-cloud-rain" },
            85: { name: "Light Snow Showers",            icon: "fa-snowflake" },
            86: { name: "Snow Showers",                  icon: "fa-snowflake" },
            95: { name: "Thunderstorm",                  icon: "fa-bolt-lightning" },
            96: { name: "Light Thunderstorms With Hail", icon: "fa-bolt-lightning" },
            99: { name: "Thunderstorm With Hail",        icon: "fa-bolt-lightning" },
        },
    };
});
