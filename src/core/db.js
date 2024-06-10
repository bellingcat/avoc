/**
 * Provides an interface with ImmortalDB
 */
define("core/db", ["libs/immortal-db"], function(Immortal) {
    return {
        set: function(key, value) {
            return Immortal.ImmortalDB.set(
                key,
                typeof value != "string" ? JSON.stringify(value) : value
            );
        },
        get: async function(key, fallback = null) {
            const v = await Immortal.ImmortalDB.get(key, fallback);
            return v.isJSON() ? JSON.parse(v) : v;
        },
        remove: function(key) {
            return ImmortalDB.remove(key);
        }
    }
});