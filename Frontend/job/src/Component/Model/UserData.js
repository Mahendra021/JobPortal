export async function userdata(id) {
    var data = await fetch("http://localhost:8000/userapi/user/"+id)
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
    var data = await fetch("http://localhost:8000/userapi/resume/")
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