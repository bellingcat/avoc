class Configuration {
    constructor(module, db) {
        this.module = module;
        this.db = db;
    }

    async load() {
        const fileSettings = this.module.config().configuration;
        const dbSettings = await this.db.get("Avoc.settings", {});
        return {...fileSettings, ...dbSettings};
    }
}

define("core/configuration", ["module", "core/db"], function() {
    return new Configuration(...arguments);
});