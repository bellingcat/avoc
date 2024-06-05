/**
 * This module is responsible for the business logic of the app.
 */
define("core/main", ["core/db", "core/router", "maps/google", "core/settings", "core/countries"],
function(db, router, gmaps, settings, countries) {
    return {
        init: async function() {
            const coords = await this.getCoordinates();
            
            // @TODO move logic inside module
            this.map1 = await gmaps.initMap("screen1", { center: coords });
            this.map2 = await gmaps.initStaticMap("screen2", { zoom: 18, minZoom: 18, center: coords });
            this.map3 = await gmaps.initStaticMap("screen3", { zoom: 18, minZoom: 18, center: coords, heading: 90 });
            this.map4 = await gmaps.initStaticMap("screen4", { zoom: 18, minZoom: 18, center: coords, heading: 180 });
            this.map5 = await gmaps.initStaticMap("screen5", { zoom: 18, minZoom: 18, center: coords, heading: 270 });
            this.map6 = await gmaps.initStreetView("screen6", { position: coords });

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
                
                db.set("lastCoordinates", coords);
                router.pushCoordinates(coords, "coords");
            });
        },
        getCoordinates: async function() {
            return router.hasValidCoordinates()
                ? router.getCoordinates()
                : await db.get("lastCoordinates", "{\"lat\":50.84,\"lng\":4.34}");
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