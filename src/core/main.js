/**
 * This module is responsible for the business logic of the app.
 */
define("core/main", ["module", "core/db", "core/router", "core/settings", "core/countries", "maps/google", "maps/mapbox"],
function(module, db, router, settings, countries, gmaps, mapbox) {
    
    router.init();
    
    return {
        init: async function() {
            const coords = await this.getCoordinates();
            
            // @TODO move logic inside module
            this.map1 = await gmaps.initMap("screen1", coords);
            this.map2 = await gmaps.initAerialMap("screen2", coords);
            this.map3 = await gmaps.initAerialMap("screen3", coords, 90);
            this.map4 = await gmaps.initAerialMap("screen4", coords, 180);
            this.map5 = await gmaps.initAerialMap("screen5", coords, 270);
            this.map6 = await gmaps.initStreetView("screen6", coords);

            // @TODO move logic inside module
            this.map1.addListener("center_changed", () => {
                let coords = {
                    lat: this.map1.getCenter().lat(),
                    lng: this.map1.getCenter().lng()
                };
                // @TODO prevent sync if zoom > X
                this.map2.setCenter(coords);
                this.map3.setCenter(coords);
                this.map3.setHeading(90);
                this.map4.setCenter(coords);
                this.map4.setHeading(180);
                this.map5.setCenter(coords);
                this.map5.setHeading(270);
                this.map6.setPosition(coords);
                
                router.pushState({coords: coords});
                db.set("Avoc.lastCoords", coords);
            });
        },
        getCoordinates: async function() {
            return router.hasStateOf("coords")
                ? router.getStateOf("coords")
                : await db.get("Avoc.lastCoords", module.config().defaultCoords);
        },
        setCoordinates: function(c) {
            if(typeof c != "string" || c == "")
                return;

            const coords = c.split(",");
            this.map1.setCenter({
                lat: parseFloat(coords[0]),
                lng: parseFloat(coords[1])
            });
        },
        settings: settings,
        countries: countries,
    }
});