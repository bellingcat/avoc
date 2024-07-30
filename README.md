# Avoc

Avoc is a GEOINT tool that combines multiple map providers and view modes in one single interface, equipped with a series of companion tools for quickly accessing georeferenced resources. No server, no package manager, no bloating dependencies: just download and run.

## Download

### Manually (less tech-savvy)
1. Download the latest release [available here](https://github.com/haruspeks/avoc/releases)
2. Open `configuration.js` and add one or more API keys in the `apiKeys` section (read below)
3. Open `index.html` in the browser of your choice

*Note*: disable any adblock feature or plugin on your browser

### From Github
1. Clone the repo
2. Copy the file `configuration.js.sample` into `configuration.js`
3. Open `configuration.js` and add one or more API keys in the `apiKeys` section (read below)
4. Open `index.html` in the browser of your choice

*Note*: disable any adblock feature or plugin on your browser

## How it works

### Maps
Avoc operates as an orchestrator for map providers and views. It currently supports Google Maps, Azure Maps, Bing Maps, and Mapbox. For each provider one or multiple views 
are available:

| Provider      | Aerial View   | Birds' Eye View | Street View |
| ------------- | ------------- | --------------- | ----------- |
| Google Maps   | x             | x               | x           |
| Azure Maps    | x             | x               |             |
| Bing Maps     |               | x               | x           |
| Mapbox        | x             | x               |             |

*Note*: Azure Maps currently doesn't provide Street View capabilities, therefore the old Bing Maps suite has been integrated. Bing Maps has been deprecated and is set to be retired on June 2025 for Free accounts, June 2028 for Enterprise accounts. [Read more here](https://learn.microsoft.com/en-us/bingmaps/getting-started/)

### Prerequisites
Avoc requires a valid API key from Google, Azure, and/or Mapbox in order to function. You need to obtain a key for each provider you intend to use:
- [Google](https://dev.to/simplecodeagency/how-to-setup-a-new-google-maps-api-key-4kp1)
- [Azure / Bing](https://learn.microsoft.com/en-us/azure/azure-maps/quick-demo-map-app#create-an-azure-maps-account)
- [Mapbox](https://docs.mapbox.com/help/getting-started/access-tokens/)

*Note*: Bing doesn't let users create new keys anymore due to planned retirement. If you don't have a valid Bing key, an Azure key can be used instead.

Once the API keys have been obtained, open the `configuration.js` file and scroll down to the `apiKeys` section.

```
apiKeys: {
    google: "Google API key goes here",
    azure:  "Azure API key goes here",
    bing:   "Azure or Bing API key goes here",
    mapbox: "Mapbox API key goes here",
},
```

## Configuration

### Customize screens
After downloading Avoc, open the `configuration.js` file and scroll down to the `screens` section.

```
screens: [
    {
        provider: "azure",
        type: "aerial",
        heading: 0,
    },
    {
        provider: "google",
        type: "birdseye",
        heading: 0,
    },
    ...
]
```

Avoc supports from 2 to 7 screens. Each screen follows this structure:

```
{
    provider: "azure",
    type: "aerial",
    heading: 0,
},
```

`provider` represents the map provider the screen will render, `type` the view mode, `heading` the direction expressed in grades from 0 to 359. Here is a full list of all possibile combination of `provider` and `type`:

| provider      | supported type           |
| ------------- | ------------------------ | 
| google        | aerial, birdseye, street |
| azure         | aerial, birdseye         |
| bing          | birdseye, street         |
| mapbox        | aerial                   |

Multiple providers and different views can be loaded at the same time. `heading` is optional, and will default to 0 (pointing North).

## Companion tools

### Shortcuts
On the top-right side of the application, the shortcut button will open a popup window with a series of quick links to some well-known GEOINT websites, which will open on the current coordinates.

These shortcuts can be added and removed by opening the `configuration.js` file and scrolling down to the `screens` section.

```
shortcuts: [
    {
        name: "MarineTraffic",
        category: "🛬 Transport",
        url: "https://www.marinetraffic.com/en/ais/home/centerx:$lng/centery:$lat/zoom:13",
        precision: 3,
    },
    ...
]
```

Each link supports 4 parameters: `name`, `category`, `url`, and `precision`. The `url` supports two magic params, `$lat` and `$lng`, which will be automatically replaced by the app with the coordinates you are currently on. For example:

```
    {
        name: "NewLink",
        category: "My Category",
        url: "https://www.website.tld/something/$lat/$lng",
    },
```

Will be transformed to `https://www.website.tld/something/0.000000000000000/0.000000000000000` when the link is open.

`precision` is optional, it can be used when the coordinates in the URL have to follow a specific format. It represent the amount of floating digits. For example:

```
    {
        name: "NewLink",
        category: "My Category",
        url: "https://www.website.tld/something/$lat/$lng",
        precision: 4,
    },
```

It means that, when the coordinates are replaced in the url, they will be in 0.0000 format. By default, it uses a 15 digits precision.

### Weather
On the top-right side of the application, the weather button will open a popup window where the weather conditions for the current location can be obtained via OpenMeteo's API. No API key is needed.

## Under the hood

- [Pico.css](https://picocss.com/)
- [Alpine.js](https://alpinejs.dev/)
- [RequireJS](https://requirejs.org/)
- Weather data powered by [OpenMeteo](https://open-meteo.com/)

## Browser compatibility

Edge 16+, Firefox 52+, Safari 10.1+, Chrome 57+, Opera 44+.

## Credits

- `kiwi-bird` favicon by [Free Icons](https://free-icons.github.io/free-icons/)
- Grid system inspired by [@sdras](https://github.com/sdras) amazing [cssgridgenerator](https://cssgrid-generator.netlify.app/)