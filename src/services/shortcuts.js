class Shortcuts {
    /**
     * 
     * @param {Object} module 
     * @param {Router} router 
     */
    constructor(module, router) {
        this.router = router;
        this.shortcuts = module.config().shortcuts;
    }

    /**
     * @returns {Array}
     */
    getCategories() {
        const categories = [];
        for(const shortcut of this.shortcuts) {
            categories.push(shortcut.category);
        }

        return categories.filter(function(v, k, a) {
            return a.indexOf(v) === k;
        });
    }

    /**
     * @returns {Array}
     */
    getLinksByCategory(category) {
        const links = [];
        for(const shortcut of this.shortcuts) {
            if(shortcut.category != category) {
                continue;
            }

            if(typeof shortcut.precision === "undefined") {
                shortcut.precision = null;
            }

            links.push(shortcut);
        }
        
        return links;
    }
    
    /**
     * 
     * @param {String} url 
     * @param {String|Number} precision 
     */
    open(url, precision = null) {
        const coords = this.router.getCoordinates();
        url = url
            .replace("$lat", precision != null ? coords.lat.toFixed(precision) : coords.lat)
            .replace("$lng", precision != null ? coords.lng.toFixed(precision) : coords.lng);
        
        window.open(url, '_blank');
    }
}

define("services/shortcuts", ["module", "core/router"], function() {
    return new Shortcuts(...arguments);
});