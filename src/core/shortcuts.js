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
                    
                    links.push(shortcuts[idx]);
                }

                return links;
            },
            open: function(url) {
                const coords = router.getStateOf('coords');
                url = url.replace("$lat", coords.lat);
                url = url.replace("$lng", coords.lng);
                window.open(url, '_blank');
            }
        }
    });