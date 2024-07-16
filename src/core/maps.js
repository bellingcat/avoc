/**
 * 
 */
define("core/maps", ["module", "core/db", "core/router", "maps/google", "maps/azure", "maps/mapbox"], function(module, db, router, gmaps, azuremaps, mapbox) {
    return {
        GOOGLE: "google",
        AZURE: "azure",
        MAPBOX: "mapbox",
        MAIN: "main",
        AERIAL: "aerial",
        STREET: "street",

        screen1: {
            id: module.config().screen1.id,
            type: module.config().screen1.type,
            provider: module.config().screen1.provider,
            heading: module.config().screen1.heading,
            lock: false,
            map: null,
        },
        screen2: {
            id: module.config().screen2.id,
            type: module.config().screen2.type,
            provider: module.config().screen2.provider,
            heading: module.config().screen2.heading,
            lock: false,
            map: null,
        },
        screen3: {
            id: module.config().screen3.id,
            type: module.config().screen3.type,
            provider: module.config().screen3.provider,
            heading: module.config().screen3.heading,
            lock: false,
            map: null,
        },
        screen4: {
            id: module.config().screen4.id,
            type: module.config().screen4.type,
            provider: module.config().screen4.provider,
            heading: module.config().screen4.heading,
            lock: false,
            map: null,
        },
        screen5: {
            id: module.config().screen5.id,
            type: module.config().screen5.type,
            provider: module.config().screen5.provider,
            heading: module.config().screen5.heading,
            lock: false,
            map: null,
        },
        screen6: {
            id: module.config().screen6.id,
            type: module.config().screen6.type,
            provider: module.config().screen6.provider,
            heading: module.config().screen6.heading,
            lock: false,
            map: null,
        },
        /**
         * 
         * @param {*} coords 
         */
        load: async function(coords) {
            await this.initScreen(this.screen1, coords);
            await this.initScreen(this.screen2, coords);
            await this.initScreen(this.screen3, coords);
            await this.initScreen(this.screen4, coords);
            await this.initScreen(this.screen5, coords);
            await this.initScreen(this.screen6, coords);

            this.setEventListener(this.screen1);
        },
        initScreen: async function(screen, coords) {
            switch(true) {
                case screen.provider == this.GOOGLE && screen.type == this.MAIN:
                    screen.map = await gmaps.initMap(screen.id, coords);
                    return true;

                case screen.provider == this.GOOGLE && screen.type == this.AERIAL:
                    screen.map = await gmaps.initAerialMap(screen.id, coords, screen.heading);
                    return true;

                case screen.provider == this.GOOGLE && screen.type == this.STREET:
                    screen.map = await gmaps.initStreetView(screen.id, coords);
                    return true;

                case screen.provider == this.AZURE && screen.type == this.MAIN:
                    screen.map = azuremaps.initMap(screen.id, coords);
                    return true;

                case screen.provider == this.AZURE && screen.type == this.AERIAL:
                    screen.map = azuremaps.initAerialMap(screen.id, coords, screen.heading);
                    return true;

                case screen.provider == this.MAPBOX && screen.type == this.MAIN:
                    screen.map = mapbox.initMap(screen.id, coords);
                    return true;

                case screen.provider == this.MAPBOX && screen.type == this.AERIAL:
                    screen.map = mapbox.initAerialMap(screen.id, coords, screen.heading);
                    return true;
            }

            return false;
        },
        setEventListener: function(screen) {
            switch(true) {
                case screen.provider == this.GOOGLE:
                    screen.map.addListener("center_changed", () => {
                        this.emitPositionChange({
                            lat: screen.map.getCenter().lat(),
                            lng: screen.map.getCenter().lng(),
                        })
                    });
                    return true;

                case screen.provider == this.AZURE:
                    screen.map.events.add('dragend', () => {
                        this.emitPositionChange({
                            lat: screen.map.getCamera().center[1],
                            lng: screen.map.getCamera().center[0],
                        })
                    });

                    screen.map.events.add('moveend', () => {
                        this.emitPositionChange({
                            lat: screen.map.getCamera().center[1],
                            lng: screen.map.getCamera().center[0],
                        })
                    });
                    return true;

                case screen.provider == this.MAPBOX:
                    screen.map.on('dragend', () => {
                        this.emitPositionChange({
                            lat: screen.map.getCenter().lat,
                            lng: screen.map.getCenter().lng,
                        })
                    });

                    screen.map.on('moveend', () => {
                        this.emitPositionChange({
                            lat: screen.map.getCenter().lat,
                            lng: screen.map.getCenter().lng,
                        })
                    });
                    return true;
            }
        },
        emitPositionChange: function(coords) {
            this.syncPosition(this.screen2, coords);
            this.syncPosition(this.screen3, coords);
            this.syncPosition(this.screen4, coords);
            this.syncPosition(this.screen5, coords);
            this.syncPosition(this.screen6, coords);

            router.pushState({coords: coords});
            db.set("Avoc.lastCoords", coords);
        },
        syncPosition: function(screen, coords) {
            if(screen.lock == true) return true;
            switch(true) {
                case screen.provider == this.GOOGLE && screen.type == this.AERIAL:
                    screen.map.setCenter(coords);
                    screen.map.setHeading(screen.heading);
                    return true;

                case screen.provider == this.GOOGLE && screen.type == this.STREET:
                    screen.map.setPosition(coords);
                    return true;

                case screen.provider == this.AZURE:
                    screen.map.setCamera({
                        center: [coords.lng, coords.lat]
                    });
                    return true;

                case screen.provider == this.MAPBOX && screen.type == this.AERIAL:
                    screen.map.setCenter([coords.lng, coords.lat]);
                    return true;
            }

            return false;
        },
        /**
         * @deprecated
         * @param {*} c 
         * @returns 
         */
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