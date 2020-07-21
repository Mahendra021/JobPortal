export function hendelZoomIn(map) {

    map.zoomIn()

}

export function hendelZoomOut(map) {
    
    map.zoomOut()

}

export function hendelLacation(map){

    navigator.geolocation.getCurrentPosition(success);

        function success(position) {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;

        console.log(position);

        map.flyTo({
            center: [long, lat],
            essential: true
        })

    }
}

export function changeLayer(map,layer){

    map.setStyle('mapbox://styles/mapbox/' + layer);

}