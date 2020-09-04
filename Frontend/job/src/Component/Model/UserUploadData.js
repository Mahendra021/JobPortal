import axios from 'axios';

export async function creatuser(data) {
    var upload = await fetch("http://localhost:8000/userapi/user/", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then((responseData) => {
            upload = responseData;
            return responseData;
        })
        .catch(error => console.log(error));

    return upload;

}

export async function updateuser(id,data) {
    var upload = await fetch("http://localhost:8000/userapi/user/"+id+"/", {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then((responseData) => {
            upload = responseData;
            return responseData;
        })
        .catch(error => console.log(error));

    return upload;

}

export async function creataddress(data) {
    var upload = await fetch("http://localhost:8000/userapi/address/", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then((responseData) => {
            upload = responseData;
            return responseData;
        })
        .catch(error => console.log(error));

    return upload;
}

export async function updateaddress(id,data) {
    var upload = await fetch("http://localhost:8000/userapi/address/"+id+"/", {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then((responseData) => {
            upload = responseData;
            return responseData;
        })
        .catch(error => console.log(error));

    return upload;
}

export async function uploadsource(data) {
    var upload = await axios.post("http://localhost:8000/userapi/source/", data, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        },
    })
        .then(response => response.json())
        .then((responseData) => {
            upload = responseData;
            return responseData;
        })
        .catch(error => console.log(error));

    return upload;
}

export async function updatesource(id,data) {
    var upload = await axios.put("http://localhost:8000/userapi/source/"+id+"/", data, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        },
    })
        .then(response => response.json())
        .then((responseData) => {
            upload = responseData;
            return responseData;
        })
        .catch(error => console.log(error));

    return upload;
}

export async function higher_education(data) {
    var upload = await fetch("http://localhost:8000/userapi/higher_education/", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then((responseData) => {
            upload = responseData;
            return responseData;
        })
        .catch(error => console.log(error));

    return upload;
}

export async function education(data){
    var upload = await fetch("http://localhost:8000/userapi/education/", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then((responseData) => {
            upload = responseData;
            return responseData;
        })
        .catch(error => console.log(error));

    console.log(data.qualification);

    return upload;
}

export async function uploadskill(data) {
    var upload = await fetch("http://localhost:8000/userapi/skill/", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then((responseData) => {
            upload = responseData;
            return responseData;
        })
        .catch(error => console.log(error));

    return upload;
}