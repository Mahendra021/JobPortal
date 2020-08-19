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
    var data = await fetch("http://localhost:8000/userapi/user/?owner="+pk,{
        method : 'GET',    
        headers : {
                'Authorization' : 'Token '+token
        }
    })
    .then(response => response.json())
    .then(result => {
        return result
    });

    return data;
}

export async function useraddress(){
    var data = await fetch("http://localhost:8000/userapi/address/")
        .then(response => response.json())
        .then(result => {
            return result
        });

    return data
}

export async function usersource(){
    var data = await fetch("http://localhost:8000/userapi/source/")
        .then(response => response.json())    
        .then(result => {
            return result
        });

    return data
}

export async function higher_education(){
    var data = await fetch("http://localhost:8000/userapi/higher_education/")
        .then(response => response.json())
        .then(result => {
            return result
        })

    return data
}

export async function education(){
    var data = await fetch("http://localhost:8000/userapi/education/")
    .then(response => response.json())
    .then(result => {
        return result
    })

    return data
}