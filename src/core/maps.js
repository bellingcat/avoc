class MapScreen {
    /**
     * @param {Object} config 
     */
    constructor(config) {
        this.PROVIDER_GOOGLE = "google";
        this.PROVIDER_AZURE = "azure";
        this.PROVIDER_MAPBOX = "mapbox";
        this.PROVIDER_BING = "bing";

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
     * @returns {Boolean}
     */
    isProviderGoogle() {
        return this.provider === this.PROVIDER_GOOGLE;
    }

    /**
     * @returns {Boolean}
     */
    isProviderAzure() {
        return this.provider === this.PROVIDER_AZURE;
    }

    /**
     * @returns {Boolean}
     */
    isProviderMapbox() {
        return this.provider === this.PROVIDER_MAPBOX;
    }

    /**
     * @returns {Boolean}
     */
    isProviderBing() {
        return this.provider === this.PROVIDER_BING;
    }

    /**
     * @returns {Boolean}
     */
    isTypeMain() {
        return this.type === this.TYPE_MAIN;
    }

    /**
     * @returns {Boolean}
     */
    isTypeAerial() {
        return this.type === this.TYPE_AERIAL;
    }

    /**
     * @returns {Boolean}
     */
    isTypeStreet() {
        return this.type === this.TYPE_STREET;
    }
}

class Maps {
    /**
     * @param {Object} module
     * @param {Router} router
     * @param {Google} google
     * @param {Azure} azure
     * @param {Mapbox} mapbox
     * @param {Bing} bing
     */
    constructor(module, router, google, azure, mapbox, bing) {
        this.router = router;
        this.google = google;
        this.azure = azure;
        this.mapbox = mapbox;
        this.bing = bing;
        this.screens = [];

        for(const screenConfig of module.config().screens) {
            this.screens.push(new MapScreen(screenConfig));
        }
    }

    /**
     * @param {Coords} coords
     */
    async load(coords) {
        let idx = 0;
        for(const screen of this.screens) {
            await this.initScreen('screen' + idx++, screen, coords);

            if(screen.isTypeMain()) {
                this.setEventListener(screen);
            }
        }
    }

    /**
     * @param {MapScreen} screen
     * @param {Coords} coords
     * @returns {Boolean}
     */
    async initScreen(id, screen, coords) {
        switch (true) {
            case screen.isProviderGoogle() && screen.isTypeMain():
                screen.map = await this.google.loadMap(id, coords);
                return true;

            case screen.isProviderGoogle() && screen.isTypeAerial():
                screen.map = await this.google.loadAerialMap(id, coords, screen.heading);
                return true;

            case screen.isProviderGoogle() && screen.isTypeStreet():
                screen.map = await this.google.loadStreetView(id, coords);
                return true;

            case screen.isProviderAzure() && screen.isTypeMain():
                screen.map = this.azure.loadMap(id, coords);
                return true;

            case screen.isProviderAzure() && screen.isTypeAerial():
                screen.map = this.azure.loadAerialMap(id, coords, screen.heading);
                return true;

            case screen.isProviderBing() && screen.isTypeAerial():
                screen.map = this.bing.loadAerialMap(id, coords, screen.heading);
                return true;

            case screen.isProviderBing() && screen.isTypeStreet():
                screen.map = this.bing.loadStreetView(id, coords, screen.heading);
                return true;

            case screen.isProviderMapbox() && screen.isTypeMain():
                screen.map = this.mapbox.loadMap(id, coords);
                return true;

            case screen.isProviderMapbox() && screen.isTypeAerial():
                screen.map = this.mapbox.loadAerialMap(id, coords, screen.heading);
                return true;
        }

        return false;
    }

    /**
     * @param {MapScreen} screen
     * @returns {Boolean}
     */
    setEventListener(screen) {
        switch (true) {
            case screen.isProviderGoogle():
                screen.map.addListener("center_changed", () => {
                    const coords = new Coords(screen.map.getCenter().lat(), screen.map.getCenter().lng());
                    this.emitPositionChange(coords);
                });

                return true;

            case screen.isProviderAzure():
                screen.map.events.add("dragend", () => {
                    const coords = new Coords(screen.map.getCamera().center[1], screen.map.getCamera().center[0]);
                    this.emitPositionChange(coords);
                });

                screen.map.events.add("moveend", () => {
                    const coords = new Coords(screen.map.getCamera().center[1], screen.map.getCamera().center[0]);
                    this.emitPositionChange(coords);
                });

                return true;

            case screen.isProviderMapbox():
                screen.map.on("dragend", () => {
                    const coords = new Coords(screen.map.getCenter().lat, screen.map.getCenter().lng);
                    this.emitPositionChange(coords);
                });

                screen.map.on("moveend", () => {
                    const coords = new Coords(screen.map.getCenter().lat, screen.map.getCenter().lng);
                    this.emitPositionChange(coords);
                });

                return true;
        }

        return false;
    }

    /**
     * @param {Coords} coords
     */
    emitPositionChange(coords, force = false) {
        for(screen of this.screens) {
            if(force || !screen.isTypeMain()) {
                this.syncPosition(screen, coords);
            }
        }

        this.router.pushState({ coords: coords });
    }

    /**
     * @param {MapScreen} screen
     * @param {Coords} coords
     * @returns {Boolean}
     */
    syncPosition(screen, coords) {
        if (screen.lock === true) return true;

        switch (true) {
            case screen.isProviderGoogle() && screen.isTypeAerial():
                screen.map.setCenter({lat: coords.lat, lng: coords.lng });
                screen.map.setHeading(screen.heading);
                return true;

            case screen.isProviderGoogle() && screen.isTypeStreet():
                screen.map.setPosition(coords);
                return true;

            case screen.isProviderAzure() && screen.isTypeMain():
            case screen.isProviderAzure() && screen.isTypeAerial():
                screen.map.setCamera({
                    center: coords.toLngLat()
                });
                return true;

            case screen.isProviderBing() && screen.isTypeAerial():
                const location = new Microsoft.Maps.Location(coords.lat, coords.lng);
                Microsoft.Maps.getIsBirdseyeAvailable(location, Microsoft.Maps.Heading.north, function(isAvailable) {
                    if(!isAvailable) {
                        screen.map.setMapType(Microsoft.Maps.MapTypeId.aerial);
                    } else {
                        screen.map.setMapType(Microsoft.Maps.MapTypeId.birdseye);
                    }
                });

                screen.map.setView({
                    center: location
                });
                return true;

            case screen.isProviderBing() && screen.isTypeStreet():
                screen.map.setView({
                    center: new Microsoft.Maps.Location(coords.lat, coords.lng),
                    mapTypeId: Microsoft.Maps.MapTypeId.streetside
                });
                return true;

            case screen.isProviderMapbox() && screen.isTypeMain():
                screen.map.setCenter(coords.toLngLat());
                return true;
        }

        return false;
    }

    toggleScreen(index) {
        this.screens[index].lock = !this.screens[index].lock;
    }

    /**
     * @param {String} lat 
     * @param {String} lng 
     */
    jumpTo(lat, lng) {
        const latitude = new Number(lat);
        const longitude = new Number(lng);
        if(latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180)
            return alert('Wrong format');

        const coords = new Coords(new Number(lat), new Number(lng));
        this.emitPositionChange(coords, true);
    }
}

define("core/maps", ["module", "core/router", "maps/google", "maps/azure", "maps/mapbox", "maps/bing"], function () {
    return new Maps(...arguments);
});