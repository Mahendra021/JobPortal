export default function AddMapSource(map) {
    map.addSource('points', {
        'type': 'geojson',
        'cluster': true,
        'clusterMaxZoom': 14,
        'clusterRadius': 40,
        'data': {
            "type": "FeatureCollection",
            "features": []
        }
    });
    return map
}