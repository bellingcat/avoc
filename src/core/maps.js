class MapScreen {
    /**
     * @param {Object} config 
     */
    constructor(config) {
        this.PROVIDER_GOOGLE = "google";
        this.PROVIDER_AZURE = "azure";
        this.PROVIDER_MAPBOX = "mapbox";

        this.TYPE_MAIN = "main";
        this.TYPE_AERIAL = "aerial";
        this.TYPE_STREET = "street";

        this.id = config.id;
        this.type = config.type;
        this.provider = config.provider;
        this.heading = config.heading;
        this.lock = false;
        this.map = null;
    }

    /**
     * @returns {boolean}
     */
    isProviderGoogle() {
        return this.provider === this.PROVIDER_GOOGLE;
    }

    /**
     * @returns {boolean}
     */
    isProviderAzure() {
        return this.provider === this.PROVIDER_AZURE;
    }

    /**
     * @returns {boolean}
     */
    isProviderMapbox() {
        return this.provider === this.PROVIDER_MAPBOX;
    }

    /**
     * @returns {boolean}
     */
    isTypeMain() {
        return this.type === this.TYPE_MAIN;
    }

    /**
     * @returns {boolean}
     */
    isTypeAerial() {
        return this.type === this.TYPE_AERIAL;
    }

    /**
     * @returns {boolean}
     */
    isTypeStreet() {
        return this.type === this.TYPE_STREET;
    }
}

class Maps {
    /**
     * 
     * @param {Object} module
     * @param {Router} router
     * @param {Object} google
     * @param {Object} azure
     * @param {Object} mapbox
     */
    constructor(module, router, google, azure, mapbox) {
        this.PROVIDER_GOOGLE = "google";
        this.PROVIDER_AZURE = "azure";
        this.PROVIDER_MAPBOX = "mapbox";

        this.TYPE_MAIN = "main";
        this.TYPE_AERIAL = "aerial";
        this.TYPE_STREET = "street";

        this.router = router;
        this.google = google;
        this.azure = azure;
        this.mapbox = mapbox;
        this.screens = [];

        for(const screenConfig of module.config()) {
            this.screens.push(new MapScreen(screenConfig));
        }
    }

    /**
     * @param {Object} coords 
     */
    async load(coords) {
        for(screen of this.screens) {
            await this.initScreen(screen, coords);  
            if(screen.type == this.TYPE_MAIN) {
                this.setEventListener(screen);
            }
        }
    }

    /**
     * 
     * @param {MapScreen} screen 
     * @param {Object} coords 
     * @returns {boolean}
     */
    async initScreen(screen, coords) {
        switch (true) {
            case screen.isProviderGoogle() && screen.isTypeMain():
                screen.map = await this.google.initMap(screen.id, coords);
                return true;

            case screen.isProviderGoogle() && screen.isTypeAerial():
                screen.map = await this.google.initAerialMap(screen.id, coords, screen.heading);
                return true;

            case screen.isProviderGoogle() && screen.isTypeStreet():
                screen.map = await this.google.initStreetView(screen.id, coords);
                return true;

            case screen.isProviderAzure() && screen.isTypeMain():
                screen.map = this.azure.initMap(screen.id, coords);
                return true;

            case screen.isProviderAzure() && screen.isTypeAerial():
                screen.map = this.azure.initAerialMap(screen.id, coords, screen.heading);
                return true;

            case screen.isProviderMapbox() && screen.isTypeMain():
                screen.map = this.mapbox.initMap(screen.id, coords);
                return true;

            case screen.isProviderMapbox() && screen.isTypeAerial():
                screen.map = this.mapbox.initAerialMap(screen.id, coords, screen.heading);
                return true;
        }

        return false;
    }

    /**
     * @param {MapScreen} screen 
     * @returns {boolean}
     */
    setEventListener(screen) {
        switch (true) {
            case screen.isProviderGoogle():
                screen.map.addListener("center_changed", () => {
                    this.emitPositionChange({
                        lat: screen.map.getCenter().lat(),
                        lng: screen.map.getCenter().lng(),
                    });
                });
                return true;

            case screen.isProviderAzure():
                screen.map.events.add("dragend", () => {
                    this.emitPositionChange({
                        lat: screen.map.getCamera().center[1],
                        lng: screen.map.getCamera().center[0],
                    });
                });

                screen.map.events.add("moveend", () => {
                    this.emitPositionChange({
                        lat: screen.map.getCamera().center[1],
                        lng: screen.map.getCamera().center[0],
                    });
                });
                return true;

            case screen.isProviderMapbox():
                screen.map.on("dragend", () => {
                    this.emitPositionChange({
                        lat: screen.map.getCenter().lat,
                        lng: screen.map.getCenter().lng,
                    });
                });

                screen.map.on("moveend", () => {
                    this.emitPositionChange({
                        lat: screen.map.getCenter().lat,
                        lng: screen.map.getCenter().lng,
                    });
                });
                return true;
        }

        return false;
    }

    /**
     * @param {Object} coords 
     */
    emitPositionChange(coords) {
        for(screen of this.screens) {
            if(screen.type != this.TYPE_MAIN) {
                this.syncPosition(screen, coords);
            }
        }

        this.router.pushState({ coords: coords });
    }

    /**
     * @param {MapScreen} screen 
     * @param {Object} coords 
     * @returns {boolean}
     */
    syncPosition(screen, coords) {
        if (screen.lock === true) return true;
        switch (true) {
            case screen.provider === this.PROVIDER_GOOGLE && screen.type === this.TYPE_AERIAL:
                screen.map.setCenter(coords);
                screen.map.setHeading(screen.heading);
                return true;

            case screen.provider === this.PROVIDER_GOOGLE && screen.type === this.TYPE_STREET:
                screen.map.setPosition(coords);
                return true;

            case screen.provider === this.PROVIDER_AZURE:
                screen.map.setCamera({
                    center: [coords.lng, coords.lat],
                });
                return true;

            case screen.provider === this.PROVIDER_MAPBOX:
                screen.map.setCenter([coords.lng, coords.lat]);
                return true;
        }

        return false;
    }

    /**
     * @deprecated
     * @param {*} c
     * @returns
     */
    jumpTo(c) {
        if (typeof c !== "string" || c === "") return;

        const coords = c.split(",");
        this.screen1.map.setCenter({
            lat: parseFloat(coords[0]),
            lng: parseFloat(coords[1]),
        });
    }
}

define(
    "core/maps",
    ["module", "core/router", "maps/google", "maps/azure", "maps/mapbox"],
    function () {
        return new Maps(...arguments);
});
