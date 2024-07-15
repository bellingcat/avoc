/**
 * 
 */
define("core/maps", ["core/db", "core/router", "maps/google"], function(db, router, gmaps) {
    return {
        screen1: {
            lock: false,
            map: null,
        },
        screen2: {
            lock: false,
            map: null,
        },
        screen3: {
            lock: false,
            map: null,
        },
        screen4: {
            lock: false,
            map: null,
        },
        screen5: {
            lock: false,
            map: null,
        },
        screen6: {
            lock: false,
            map: null,
        },
        load: async function(coords) {
            this.screen1.map = await gmaps.initMap("screen1", coords);
            this.screen2.map = await gmaps.initAerialMap("screen2", coords);
            this.screen3.map = await gmaps.initAerialMap("screen3", coords, 90);
            this.screen4.map = await gmaps.initAerialMap("screen4", coords, 180);
            this.screen5.map = await gmaps.initAerialMap("screen5", coords, 270);
            this.screen6.map = await gmaps.initStreetView("screen6", coords);

            this.screen1.map.addListener("center_changed", () => {
                let coords = {
                    lat: this.screen1.map.getCenter().lat(),
                    lng: this.screen1.map.getCenter().lng(),
                };
                if (this.screen2.lock === false) {
                    this.screen2.map.setCenter(coords);
                }
                if (this.screen3.lock === false) {
                    this.screen3.map.setCenter(coords);
                    this.screen3.map.setHeading(90);
                }
                if (this.screen4.lock === false) {
                    this.screen4.map.setCenter(coords);
                    this.screen4.map.setHeading(180);
                }
                if (this.screen5.lock === false) {
                    this.screen5.map.setCenter(coords);
                    this.screen5.map.setHeading(270);
                }
                if (this.screen6.lock === false) {
                    this.screen6.map.setPosition(coords);
                }

                router.pushState({ coords: coords });
                db.set("Avoc.lastCoords", coords);
            });
        },
        jumpTo: function(c) {
            if(typeof c != "string" || c == "") return;

            const coords = c.split(",");
            this.screen1.map.setCenter({
                lat: parseFloat(coords[0]),
                lng: parseFloat(coords[1])
            });
        }
    }
});