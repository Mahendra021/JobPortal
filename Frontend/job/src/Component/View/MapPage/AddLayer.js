export default function AddLayer(map) {

    map.addLayer({
        'id': 'points',
        'type': 'symbol',
        'source': "points",
        'layout': {
            // get the icon name from the source's "icon" property
            // concatenate the name to get an icon from the style's sprite sheet
            'icon-image': "marker",
            // get the title name from the source's "title" property
            "icon-allow-overlap": true,
            'icon-size': 0.75,
            'text-field': ['get', 'name'],
            'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
            'text-offset': [0, 0.9],
            'text-anchor': 'top'
        }
    });

    map.addLayer({
        id: "clusters",
        type: "circle",
        source: "points",
        'layout': { "visibility": "visible", },
        filter: ["has", "point_count"],
        paint: {
            "circle-color": [
                "step",
                ["get", "point_count"],
                "#171d22", //   * Blue, 15px circles when point count is less than 4
                4,
                "#36434f", //   * Yellow, 20px circles when point count is between 100 and 6
                6,
                "#4e6172"   //  * orange, 25px circles when point count is greater than or equal to 6
            ],
            "circle-radius": [
                "step",
                ["get", "point_count"],
                15,
                4,
                15,
                6,
                15
            ],
            "circle-stroke-width": 1.5,
            "circle-stroke-color": "#ffffff",
        }
    });

    map.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "points",

        filter: ["has", "point_count"],
        layout: {
            "text-field": "{point_count_abbreviated}",
            "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
            "text-size": 10,
            "visibility": "visible",

        },
        paint: {
            "text-color": "#ffffff"
        }
    });

    return map
}