/**
 * This module is responsible for the business logic of the app.
 */
define("services/weather", ["module"], function (module) {
    return {
        grab: async function(coords) {
            const url = module.config().endpoint
                .replace("$lat", coords.lat)
                .replace("$lng", coords.lng);

            let response = await fetch(url);
            let data = await response.json();

            return {
                precipitation: data.current.precipitation + data.current_units.precipitation,
                cloud_cover: data.current.cloud_cover + data.current_units.cloud_cover,
                wind_speed_10m: data.current.wind_speed_10m + data.current_units.wind_speed_10m,
                wind_direction_10m: data.current.wind_direction_10m + data.current_units.wind_direction_10m,
                temperature_2m: data.current.temperature_2m + data.current_units.temperature_2m,
                is_day: data.current.is_day,
                name: this.WMOcodes[data.current.weather_code].name,
                icon: this.WMOcodes[data.current.weather_code].icon,
                color: this.WMOcodes[data.current.weather_code].color,
            };
        },
        WMOcodes: {
            0:  { name: "Sunny",                         icon: "fa-sun",                 color: "yellow" },
            1:  { name: "Mainly Sunny",                  icon: "fa-cloud-sun",           color: "yellow" },
            2:  { name: "Partly Cloudy",                 icon: "fa-cloud-sun",           color: "gray" },
            3:  { name: "Cloudy",                        icon: "fa-cloud",               color: "gray" },
            45: { name: "Foggy",                         icon: "fa-smog",                color: "gray" },
            48: { name: "Rime Fog",                      icon: "fa-smog",                color: "gray" },
            51: { name: "Light Drizzle",                 icon: "fa-water",               color: "gray" },
            53: { name: "Drizzle",                       icon: "fa-water",               color: "gray" },
            55: { name: "Heavy Drizzle",                 icon: "fa-water",               color: "gray" },
            56: { name: "Light Freezing Drizzle",        icon: "fa-water",               color: "gray" },
            57: { name: "Freezing Drizzle",              icon: "fa-water",               color: "gray" },
            61: { name: "Light Rain",                    icon: "fa-cloud-rain",          color: "blue" },
            63: { name: "Rain",                          icon: "fa-cloud-rain",          color: "blue" },
            65: { name: "Heavy Rain",                    icon: "fa-cloud-showers-heavy", color: "blue" },
            66: { name: "Light Freezing Rain",           icon: "fa-snowflake",           color: "blue" },
            67: { name: "Freezing Rain",                 icon: "fa-snowflake",           color: "blue" },
            71: { name: "Light Snow",                    icon: "fa-snowflake",           color: "white" },
            73: { name: "Snow",                          icon: "fa-snowflake",           color: "white" },
            75: { name: "Heavy Snow",                    icon: "fa-snowflake",           color: "white" },
            77: { name: "Snow Grains",                   icon: "fa-snowflake",           color: "white" },
            80: { name: "Light Showers",                 icon: "fa-cloud-rain",          color: "white" },
            81: { name: "Showers",                       icon: "fa-cloud-rain",          color: "blue" },
            82: { name: "Heavy Showers",                 icon: "fa-cloud-showers-heavy", color: "blue" },
            85: { name: "Light Snow Showers",            icon: "fa-snowflake",           color: "blue" },
            86: { name: "Snow Showers",                  icon: "fa-snowflake",           color: "blue" },
            95: { name: "Thunderstorm",                  icon: "fa-bolt-lightning",      color: "yellow" },
            96: { name: "Light Thunderstorms With Hail", icon: "fa-bolt-lightning",      color: "yellow" },
            99: { name: "Thunderstorm With Hail",        icon: "fa-bolt-lightning",      color: "yellow" },
        },
    };
});
