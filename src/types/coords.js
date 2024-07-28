class Coords {
    /**
     * @param {Number} lat
     * @param {Number} lng
     */
    constructor(lat, lng) {
        this.lat = lat;
        this.lng = lng;

        Coords.prototype.valueOf = function () {
            return {
                lat: this.lat,
                lng: this.lng
            }
        }
    }

    /**
     * @returns {Array}
     */
    toLatLng() {
        return [ this.lat, this.lng ];
    }

    /**
     * @returns {Array}
     */
    toLngLat() {
        return [ this.lng, this.lat ];
    }
}