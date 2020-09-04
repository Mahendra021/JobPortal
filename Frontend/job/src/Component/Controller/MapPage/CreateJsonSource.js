export function  CreateJsonSource1(list) {
    if ( list === undefined || list === []){
        return null
    }

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

// export default function CreateJsonSource(add,comp,post,img) {
//     if ( add === undefined || add === []){
//         return null
//     }
//     var features = [];
//     for (var i = 0; i < add.length; i++) {
//         var Feature = {
//             "type": "Feature",
//             "geometry": {
//                 "type": "Point",
//                 "coordinates": [
//                     add[i].xcoord,
//                     add[i].ycoord
//                 ]
//             },
//             'properties': {
//                 'id': comp[i].id,
//                 'name': comp[i].name,
//                 'title': post[i].title,
//                 'publish_date': post[i].publish_on,
//                 'add': add[i].local_addr,
//                 'city': add[i].city,
//                 'state': add[i].state,
//                 'img': img[i].source,
//             },
//             "id": comp[i].id
//         }
//         features.push(Feature)
//     }

//     return features;

// }

// export function CreateJsonSource2(add,user,source) {
//     if ( add === undefined || add === []){
//         return null
//     }
//     var features = [];
//     for (var i = 0; i < add.length; i++) {
//         var Feature = {
//             "type": "Feature",
//             "geometry": {
//                 "type": "Point",
//                 "coordinates": [
//                     add[i].xcoord,
//                     add[i].ycoord
//                 ]
//             },
//             'properties': {
//                 'id': user[i].id,
//                 'name': user[i].fname +" "+ user[i].lname,
//                 'add': add[i].local_area_name,
//                 'city': add[i].city,
//                 'state': add[i].state,
//                 'img': source[i].profile,
//             },
//             "id": user[i].id
//         }
//         features.push(Feature)
//     }

//     return features;

// }

export function CreateJsonSource2(list) {
    if ( list === undefined || list === []){
        return null
    }
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
                'name': list[i].fname +" "+ list[i].lname,
                'add': list[i].address[0].local_area_name,
                'city': list[i].address[0].city,
                'state': list[i].address[0].state,
                'img': list[i].source[0].profile,
            },
            "id": list[i].id
        }
        features.push(Feature)
    }

    return features;

}