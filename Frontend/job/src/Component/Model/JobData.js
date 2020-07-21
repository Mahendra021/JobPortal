export async function JobData() {
    var data = await fetch('http://localhost:8000/jobapi/map')
        .then(response => response.json())
        .then(result => {
            return result
        });

    return data;
}

export async function JobIdData(id) {
    var data = await fetch('http://localhost:8000/jobapi/map/' + id)
        .then(response => response.json())
        .then(result => {
            return result
        });

    return data;
}

export async function SuggestionData(name) {
    var data = await fetch('http://localhost:8000/jobapi/suggetion?search=' + name)
        .then(response => response.json())
        .then(result => {
            return result
        });

    return data;
}

export async function FiterData(salary, experience, name) {
    var data = await fetch('http://localhost:8000/jobapi/filter?job__salary__gte=' + salary + '&job__experience__lte=' + experience + '&search=' + name)
        .then(response => response.json())
        .then(result => {
            return result
        });

    return data;
}

export async function RecommandData(salary, experience, skill){

    var data = await fetch('http://localhost:8000/jobapi/filter?job__salary__gte=' + salary + '&job__experience__lte=' + experience + '&job__jobskill__skill=' + skill)
        .then(response => response.json())
        .then(result => {
            return result
        })

    return data;

}