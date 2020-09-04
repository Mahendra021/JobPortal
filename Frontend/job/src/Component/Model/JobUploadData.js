export async function AddCompany(data){
    var upload = await fetch("http://localhost:8000/jobapi/copmany/", {
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

export async function AddCompanyAddress(data){
    var upload = await fetch("http://localhost:8000/jobapi/address/", {
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

export async function AddPostJob(data){
    var upload = await fetch("http://localhost:8000/jobapi/post/", {
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

export async function AddSource(data){

    var upload = await fetch("http://localhost:8000/jobapi/image/", {
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