/**
 * Provides an interface with ImmortalDB
 */
class Services {
    /**
     * 
     * @param {Object} module 
     * @param {OpenMeteo} weather 
     */
    constructor(module, weather) {
        this.language = module.config().language;
        this.weather = weather;
    }

    /**
     * @returns {Object}
     */
    async getCurrentWeather() {
        return await this.weather.grab();
    }
}

define("core/services", ["module", "services/weather"],  function() {
    return new Services(...arguments);
});