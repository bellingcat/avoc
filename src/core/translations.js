class Translations {
    constructor() {
        this.languages = {};
    }

    /**
     * @param {Language} language
     */
    addLanguage(language) {
        this.languages[language.code] = language.labels;
    }

    /**
     * Defaults back to English if a string is not translated.
     * 
     * @param {String} code 
     * @returns {Object}
     */
    getLanguage(code) {
        return {...this.languages["en"], ...this.languages[code]};
    }

    /**
     * @returns {Array} 
     */
    getSupportedLanguages() {
        return Object.keys(this.languages);
    }
}

define("core/translations", [
    "translations/en",
    "translations/it",
    "translations/fr",
    "translations/es",
    "translations/de",
    "translations/pl",
], function () {
    const translations = new Translations();
    
    for(language of arguments)
        translations.addLanguage(language);

    return translations;
});
