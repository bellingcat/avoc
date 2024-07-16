/**
 * 
 */
define("core/shortcuts", ["module", "core/router"], function(module, router) {
        return {
            getCategories: function() {
                const categories = [];
                const shortcuts = module.config().shortcuts;
                for(idx in shortcuts)
                {
                    if(
                        typeof shortcuts[idx] !== "object" ||
                        typeof shortcuts[idx].url === "undefined" || 
                        typeof shortcuts[idx].name === "undefined" || 
                        typeof shortcuts[idx].category === "undefined"
                    )
                        continue;
                    
                    categories.push(shortcuts[idx].category);
                }

                return categories.filter(function(v, k, a) {
                    return a.indexOf(v) === k;
                });
            },
            getLinks: function(category) {
                const links = [];
                const shortcuts = module.config().shortcuts;
                for(idx in shortcuts)
                {
                    if(
                        typeof shortcuts[idx] !== "object" ||
                        typeof shortcuts[idx].url === "undefined" || 
                        typeof shortcuts[idx].name === "undefined" || 
                        typeof shortcuts[idx].category === "undefined" ||
                        shortcuts[idx].category != category
                    )
                        continue;

                    if(typeof shortcuts[idx].precision === "undefined")
                        shortcuts[idx].precision = null;
                    
                    links.push(shortcuts[idx]);
                }

                return links;
            },
            open: function(url, precision = null) {
                const coords = router.getStateOf('coords');
                url = url
                    .replace("$lat", precision != null ? coords.lat.toFixed(precision) : coords.lat)
                    .replace("$lng", precision != null ? coords.lng.toFixed(precision) : coords.lng);
                
                window.open(url, '_blank');
            }
        }
    });