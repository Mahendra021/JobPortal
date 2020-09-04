export async function ownerdata(token){
    var data = await fetch("http://localhost:8000/rest-auth/user/",{
        method : 'GET',
        headers : {
            'Authorization' : 'Token '+token
        }
    })
    .then(response => response.json())
    .then(result => {
        return result
    });

    console.log(data);
    return data;
}

export async function userdata(pk,token) {
    var data = await fetch("http://localhost:8000/userapi/user/?owner="+pk)
    .then(response => response.json())
    .then(result => {
        return result
    });

    return data;
}

export async function useraddress(pk){
    var data = await fetch("http://localhost:8000/userapi/address/?owner="+pk)
        .then(response => response.json())
        .then(result => {
            return result
        });

    return data
}

export async function usersource(pk){
    var data = await fetch("http://localhost:8000/userapi/source/?owner="+pk)
        .then(response => response.json())    
        .then(result => {
            return result
        });

    return data
}

export async function higher_education(pk){
    var data = await fetch("http://localhost:8000/userapi/higher_education/?owner="+pk)
        .then(response => response.json())
        .then(result => {
            return result
        })

    return data
}

export async function education(pk){
    var data = await fetch("http://localhost:8000/userapi/education/")
    .then(response => response.json())
    .then(result => {
        return result
    })

    return data
}

export async function userallData(){
    var data = await fetch("http://localhost:8000/userapi/map/")
    .then(response => response.json())
    .then(result => {
        return result
    })

    return data
}

export async function SuggestionNameData(name){
    
    var data = await fetch('http://localhost:8000/userapi/suggetion?search=' + name)
    .then(response => response.json())
    .then(result => {
        return result
    })

    return data
}

export async function FilterNameData(experians,name){
    var data = await fetch('http://localhost:8000/userapi/filter?experians__lte'+experians+'&search=' + name)
    .then(response => response.json())
    .then(result => {
        return result
    })

    return data
}