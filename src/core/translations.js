class Translations {
    constructor() {
        this.languages = [];
    }

    /**
     * 
     * @param {String} code 
     * @param {Object} translations 
     */
    addLanguage(code, translations) {
        this.languages[code] = translations;
    }

    /**
     * 
     * @param {String} code 
     * @returns {Object}
     */
    getLanguage(code) {
        return this.languages[code];
    }
}

define("core/translations", [
    "translations/en",
    "translations/it"
], function () {
    const translations = new Translations();
    
    for(language of arguments) {
        translations.addLanguage(language.code, language.labels);
    }

    return translations;
});
