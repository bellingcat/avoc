class Configuration {
    /**
     * @param {Object} module 
     * @param {Db} db 
     */
    constructor(module, db) {
        this.module = module;
        this.db = db;
    }

    /**
     * @returns {Object} 
     */
    load() {
        const fileSettings = this.module.config().configuration;
        const dbSettings = this.db.get("Avoc.settings", {});
        return {...fileSettings, ...dbSettings};
    }
}

define("core/configuration", ["module", "core/db"], function() {
    return new Configuration(...arguments);
});