/**
 * Settings behavior.
 */
define("core/settings", ["core/db"], function(db) {
    //@TODO monitors to be deprecated, simplify logic
    return {
        monitors: {
            min: 1,
            max: 7,
            active: 6,
            setActive: function(v) {
                this.active = v;
            }
        },
        canChangeMonitors: function() {
            return false;
        }
    }
});