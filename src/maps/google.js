define("maps/google", ["module"], function(module) {
    (g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
        key: module.config().apiKey,
        v: "weekly",
    });
    
    return {
        initMap: async function(id, options) {
            const { Map } = await google.maps.importLibrary("maps");
            return new Map(
                document.getElementById(id),
                {
                    zoom: 16,
                    mapTypeId: "satellite",
                    heading: 0,
                    streetViewControl: false,
                    ...options,
                }
            );
        },
        initStaticMap: async function(id, options) {
            return this.initMap(
                id,
                {
                    zoom: 18,
                    minZoom: 18,
                    ...options,
                    zoomControl: false,
                    mapTypeControl: false,
                    scaleControl: false,
                    streetViewControl: false,
                    rotateControl: false,
                    fullscreenControl: true,
                }
            );
        },
        initStreetView: async function(id, options) {
            const { StreetViewPanorama } = await google.maps.importLibrary("streetView");
            return new StreetViewPanorama(
                document.getElementById(id),
                {
                    pov: {
                        heading: 0,
                        pitch: 0,
                    },
                    ...options,
                    panControl: false,
                }
            );
        }
    }
});