# Avoc

Avoc is a GEOINT tool which combines multiple map providers and view modes in one single interface, and equipped with a series of companion tools for scraping geotagged/georeferenced contents.

## Setup

### From Github
1. Clone the repo
2. Copy the file `configuration.js.sample` into `configuration.js`
3. Open `configuration.js` and add a valid Google Maps' API key to apiKeys.google

### Manually
1. Download the latest release [available here](https://github.com/haruspeks/avoc/releases)
2. Open `configuration.js` and add a valid Google Maps' API key to apiKeys.google

### How to obtain a Google Maps API key
A good how-to guide is [available here](https://dev.to/simplecodeagency/how-to-setup-a-new-google-maps-api-key-4kp1).

## Under the hood

- [Pico.css](https://picocss.com/)
- [Alpine.js](https://alpinejs.dev/)
- [RequireJS](https://requirejs.org/)
- Weather data powered by [OpenMeteo](https://open-meteo.com/)
- Altitude data powered by [OpenMeteo](https://open-meteo.com/) and [Open-Elevation](https://www.open-elevation.com/)

## Browser compatibility

Edge 16+, Firefox 52+, Safari 10+, Chrome 57+, Opera 44+.

## Credits

`kiwi-bird` favicon by [Free Icons](https://free-icons.github.io/free-icons/).
