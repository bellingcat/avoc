class Services {
    /**
     * @param {OpenMeteo} weather
     * @param {Shortcuts} shortcuts
     */
    constructor(weather, shortcuts) {
        this.weather = weather;
        this.shortcuts = shortcuts;
    }

    /**
     * @returns {OpenMeteo}
     */
    getWeather() {
        return this.weather;
    }

    /**
     * @returns {Shortcuts}
     */
    getShortcuts() {
        return this.shortcuts;
    }
}

define("core/services", [
    "services/weather",
    "services/shortcuts"
],  function() {
    return new Services(...arguments);
});