class Db {
    /**
     * @param {String} key
     * @param {*} value
     */
    set(key, value) {
        const data = typeof value != "string" ? JSON.stringify(value) : value;
        sessionStorage.setItem(key, data);
        localStorage.setItem(key, data);
    }

    /**
     * @param {String} key
     * @param {*} fallback
     * @returns {*}
     */
    get(key, fallback = null) {
        let value = sessionStorage.getItem(key);
        if(value === null || value === "undefined" || typeof value === "undefined") value = localStorage.getItem(key);
        if(value === null || value === "undefined" || typeof value === "undefined") value = fallback;

        return typeof value == "string" ? JSON.parse(value) : value;
    }

    /**
     * @param {String} key
     */
    remove(key) {
        sessionStorage.removeItem(key);
        localStorage.removeItem(key);
    }
}

define("core/db", function() {
    return new Db();
});