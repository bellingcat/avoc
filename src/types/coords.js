class Coords {
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
}