/**
 * Settings behavior.
 */
define("modules/settings", ["modules/db"], function(db) {
    //@TODO monitors to be deprecated, simplify logic
    return {
        monitors: {
            min: 1,
            max: 7,
            active: 5,
            setActive: function(v) {
                this.active = v;
            }
        },
        canChangeMonitors: function() {
            return false;
        }
    }
});