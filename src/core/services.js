/**
 * Provides an interface with ImmortalDB
 */
define("core/services",
    ["module", "core/router", "core/db", "services/countries", "services/translations", "services/elevation"], 
    function(module, router, db, countries, translations, elevation) {
        return {
            getTranslation: function() {
                return translations[module.config().language];
            },
            getElevation: async function() {
                const coords = await this.getCoordinates();
                return await elevation.get(coords) + 'm';
            },
            getCountries: function() {
                return countries;
            },
            getCoordinates: async function() {
                return router.hasStateOf("coords")
                    ? router.getStateOf("coords")
                    : await db.get("Avoc.lastCoords", module.config().defaultCoords);
            },
        }
});