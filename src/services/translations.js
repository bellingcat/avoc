/**
 * List of countries and coordinates of the respective capitals.
 * Helpful to provide fast navigation without relying on geolocation APIs,
 * which are notoriously expensive.
 * 
 * @TODO in the future, consider adding regions/major cities
 */
define("services/translations", function () {
    return {
        en: {
            chooseCountry: "Choose country...",
            tooltipCountry: "Fast navigate to a specific country",
            tooltipElevation: "Obtain elevation for the current position",
        }
    }
});
