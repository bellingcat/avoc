class OpenMeteo {
    /**
     * @param {Router} router 
     */
    constructor(router) {
        this.router = router;
        this.endpoint = "https://api.open-meteo.com/v1/forecast?latitude=$lat&longitude=$lng&current=temperature_2m,is_day,precipitation,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m";
        this.labels = {
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
        };
    }
    
    /**
     * @async
     * @returns {Object}
     */
    async query() {
        const coords = this.router.getCoordinates();
        const url = this.endpoint
            .replace("$lat", coords.lat)
            .replace("$lng", coords.lng);

        const response = await fetch(url);
        const data = await response.json();

        return {
            elevation: data.elevation + "m",
            precipitation: data.current.precipitation + data.current_units.precipitation,
            cloudCover: data.current.cloud_cover + data.current_units.cloud_cover,
            windSpeed: data.current.wind_speed_10m + data.current_units.wind_speed_10m,
            windDirection: data.current.wind_direction_10m + data.current_units.wind_direction_10m,
            temperature: data.current.temperature_2m + data.current_units.temperature_2m,
            label: this.labels[data.current.weather_code].name,
            lastUpdate: data.current.time + " " + data.timezone,
        };
    }
}

define("services/weather", ["core/router"], function () {
    return new OpenMeteo(...arguments);
});
