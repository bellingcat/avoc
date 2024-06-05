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
            return this.isJSON(v) ? JSON.parse(v) : v;
        },
        remove: function(key) {
            return ImmortalDB.remove(key);
        },
        isJSON: function(s) {
            console.log(s);
            if(/^\s*$/.test(s)) return false;
            if(/^\s*(\{|\[)/.test(s)) {
                s = s.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@');
                s = s.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']');
                s = s.replace(/(?:^|:|,)(?:\s*\[)+/g, '');
                return (/^[\],:{}\s]*$/).test(s);
            }
            return false;
        }
    }
});