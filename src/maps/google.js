class Google {
    /**
     * @param {Object} module
     */
    constructor(module) {
        (g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
            key: module.config().apiKey,
            v: "weekly",
        });
    }

    /**
     * @param {String} id
     * @param {Coords} coords
     * @param {Object} options
     * @returns
     */
    async loadAerialMap(id, coords, options = {}) {
        const { Map } = await google.maps.importLibrary("maps");
        return new Map(
            document.getElementById(id),
            {
                center: coords,
                zoom: 16,
                mapTypeId: "satellite",
                streetViewControl: false,
                ...options
            }
        );
    }

    /**
     * @param {String} id
     * @param {Coords} coords
     * @param {Number} heading
     * @param {Object} options
     * @returns
     */
    async loadBirdseyeMap(id, coords, heading = 0, options = {}) {
        const { Map } = await google.maps.importLibrary("maps");
        return new Map(
            document.getElementById(id),
            {
                center: coords,
                zoom: 18,
                tilt: 45,
                mapTypeId: "satellite",
                streetViewControl: false,
                heading: heading,
                zoomControl: false,
                mapTypeControl: false,
                scaleControl: true,
                rotateControl: false,
                fullscreenControl: true,
                headingInteractionEnabled: true,
                ...options
            }
        );
    }

    /**
     * @param {String} id
     * @param {Coords} coords
     * @param {Object} options
     * @returns
     */
    async loadStreetMap(id, coords, heading = 0, options = {}) {
        const { StreetViewPanorama } = await google.maps.importLibrary("streetView");
        return new StreetViewPanorama(
            document.getElementById(id),
            {
                position: coords,
                pov: {
                    heading: heading,
                    pitch: 0,
                },
                panControl: false,
                ...options
            }
        );
    }
}

define("maps/google", ["module"], function() {
    return new Google(...arguments);
});