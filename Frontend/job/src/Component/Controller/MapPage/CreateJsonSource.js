export default function CreateJsonSource(list) {
    if (list === undefined)
        return null

    var features = [];
    for (var i = 0; i < list.length; i++) {
        var Feature = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    list[i].address[0].xcoord,
                    list[i].address[0].ycoord
                ]
            },
            'properties': {
                'id': list[i].id,
                'name': list[i].name,
                'title': list[i].job[0].title,
                'publish_date': list[i].job[0].publish_on,
                'add': list[i].address[0].local_addr,
                'city': list[i].address[0].city,
                'state': list[i].address[0].state,
                'img': list[i].image[0].source,
            },
            "id": list[i].id
        }
        features.push(Feature)
    }

    return features;

}