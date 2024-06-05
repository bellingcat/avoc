/**
 * Provides an interface with ImmortalDB
 */
define("modules/db", ["libs/immortal-db"], function(Immortal) {
    return {
        set: function(key, value) {
            if (typeof value != "string")
                value = JSON.stringify(value);
            return Immortal.ImmortalDB.set(key, value);
        },
        get: function(key, fallback = null) {
            return Immortal.ImmortalDB.get(key, fallback);
        },
        remove: function(key) {
            return ImmortalDB.remove(key);
        }
    }
});