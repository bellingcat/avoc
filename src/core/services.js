/**
 * Provides an interface with ImmortalDB
 */
class Services {
    /**
     * 
     * @param {Object} module 
     * @param {Object} translations 
     * @param {OpenMeteo} weather 
     */
    constructor(module, translations, weather) {
        this.language = module.config().language;
        this.translations = translations;
        this.weather = weather;
    }

    /**
     * @returns {Object}
     */
    getTranslation() {
        return this.translations[this.language];
    }

    /**
     * @returns {Object}
     */
    async getCurrentWeather() {
        return await this.weather.grab();
    }
}

define("core/services", ["module", "services/translations", "services/weather"],  function() {
    return new Services(...arguments);
});