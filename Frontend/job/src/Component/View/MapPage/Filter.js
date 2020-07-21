import { SuggestionData,FiterData } from '../../Model/JobData'
import { createBrowserHistory } from 'history'
import CreateJsonSource from '../../Controller/MapPage/CreateJsonSource'

var  history = createBrowserHistory()

export async function hendelSuggestionlist() {
    
    var value = document.getElementById('suggestion').value
    var list = document.getElementsByClassName("suggestionbox")[0]
    var suggestion = await SuggestionData(value)
    if (value.length > 0) {
        list.innerHTML = ''
        var arr = []
        suggestion.forEach(item => {
            var name = (item.name).toUpperCase()
            var title = (item.job[0].title).toUpperCase()
            if (name.includes(value.toUpperCase()) === true && item.name !== '') {
                if (arr.includes(item.name) !== true) {
                    var li = document.createElement('li')
                    li.className = 'suggestionlist'
                    li.innerText = item.name
                    arr.push(item.name)
                    li.onclick = () => {
                        document.getElementById('suggestion').value = item.name
                        list.innerHTML = ''
                    }
                    list.appendChild(li);
                }
            }
            else if (title.includes(value.toUpperCase()) === true && item.job[0].title !== '') {
                if (arr.includes(item.job[0].title) !== true) {
                    var li = document.createElement('li')
                    li.className = 'suggestionlist'
                    li.innerHTML = item.job[0].title
                    arr.push(item.job[0].title)
                    li.onclick = () => {
                        document.getElementById('suggestion').value = item.job[0].title
                        list.innerHTML = ''
                    }
                    list.appendChild(li);
                }
            }
            else if (item.job[0].jobskill.length > 0) {
                for (var i = 0; i < item.job[0].jobskill.length; i++) {
                    console.log(item.job[0].jobskill[i].skill);
                    var skill = (item.job[0].jobskill[i].skill).toUpperCase()
                    if (skill.includes(value.toUpperCase()) === true && item.job[0].jobskill[i].skill !== '') {
                        if (arr.includes(item.job[0].jobskill[i].skill) !== true) {
                            var li = document.createElement('li')
                            li.className = 'suggestionlist'
                            li.innerHTML = item.job[0].jobskill[i].skill
                            arr.push(item.job[0].jobskill[i].skill)
                            li.onclick = () => {
                                document.getElementById('suggestion').value = li.innerHTML
                                list.innerHTML = ''
                            }
                            list.appendChild(li);
                        }
                    }
                }
            }
        })
        console.log(arr);

    }
    else {
        list.innerHTML = ''
    }
}

export async function hendelSearch (map){

    var name = document.getElementById('suggestion').value
    history.push('/?search=' + name)

    var salary = this.state.salaryfilter
    var experience = this.state.experiencefilter

    var data = await FiterData(salary, experience, name)
    var features = CreateJsonSource(data)
    this.addSource(features)
    if (name.length === 0) {
        this.setState({
            list: [],
            filter: []
        })
    }
    else {
        this.setState({
            list: features
        })
    }
    var long = this.state.search[0]
    var lat = this.state.search[1]
    if (this.state.search.length !== 0) {
        map.flyTo({
            center: [long, lat],
            essential: true,
            zoom: 13,
        })
    }

    var list = document.getElementsByClassName("suggestionbox")[0]
    list.innerHTML = ''
    document.getElementById('suggestion').value = ''
    document.getElementsByClassName('mapboxgl-ctrl-geocoder--input')[0].value = ''

}

export async function hendelexperience(experience) {
    var salary = this.state.salaryfilter
    var name = document.getElementById('suggestion').value
    var data = await FiterData(salary, experience, name)
    var features = CreateJsonSource(data)
    this.addSource(features)
    this.setState({
        experiencefilter: experience,
        filter: features
    })
}

export async function hendelsalary(salary) {
    var experience = this.state.experiencefilter
    var name = document.getElementById('suggestion').value
    var list = this.state.list
    var data = await FiterData(salary, experience, name)
    var features = CreateJsonSource(data)
    this.setState({
        salaryfilter: salary,
        filter: features
    })
}

export function hendelHomeSearch(){

    var name = document.getElementById('suggestion').value
    history.push('/?search=' + name)
    window.location.reload()

}

export function hendelRecommended(){

    history.push('/recommended')
    window.location.reload()

}