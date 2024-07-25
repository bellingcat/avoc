/**
 * Provides an interface with ImmortalDB
 */
class Db {
    constructor(Immortal) {
        this.interface = Immortal.ImmortalDB;
    }

    /**
     * @param {String} key 
     * @param {*} value 
     * @returns 
     */
    set(key, value) {
        return this.interface.set(
            key,
            typeof value != "string" ? JSON.stringify(value) : value
        );
    }

    /**
     * @param {String} key 
     * @param {*} fallback 
     * @returns {*}
     */
    async get(key, fallback = null) {
        const v = await this.interface.get(key, fallback);
        return typeof v == "string" ? JSON.parse(v) : v;
    }

    /**
     * @param {String} key 
     * @returns 
     */
    remove(key) {
        return this.interface.remove(key);
    }
}
define("core/db", ["libs/immortal-db"], function() {
    return new Db(...arguments);
});