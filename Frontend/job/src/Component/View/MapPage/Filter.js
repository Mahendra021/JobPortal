import { SuggestionData,FiterData } from '../../Model/JobData'
import { SuggestionNameData,FilterNameData } from '../../Model/UserData'
import { createBrowserHistory } from 'history'
import queryString from 'query-string'
import {CreateJsonSource1, CreateJsonSource2} from '../../Controller/MapPage/CreateJsonSource'

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

    }
    else {
        list.innerHTML = ''
    }
}

export async function hendelSearch (map){

    var url = window.location.search
    var Params = queryString.parse(url)
    var data,features
    var name = document.getElementById('suggestion').value
    if(window.location.pathname === "/map" || window.location.pathname === "/map/" || window.location.pathname === "/recommended" || window.location.pathname === "/recommended/"){
        data = await FiterData('', '', name)
        features = CreateJsonSource1(data)
        history.push("/map/?search="+name)   
    }
    else if(Params.exp && Params.salary && Params.search){
        data = await FiterData(Params.salary, Params.exp, name)
        features = CreateJsonSource1(data)
        history.push("/map/?exp="+Params.exp+"&salary="+Params.salary+"&search="+name)
    }
    else if(Params.search && Params.salary){
        data = await FiterData(Params.salary, '',name)
        features = CreateJsonSource1(data)
        history.push("/map/?salary="+Params.salary+"&search="+name)
    }
    else if(Params.exp && Params.search){
        data = await FiterData('', Params.exp, name)
        features = CreateJsonSource1(data)
        history.push("/map/?exp="+Params.exp+"&search="+name)
    }
    else if(Params.salary && Params.exp){
        data = await FiterData(Params.salary, Params.exp, name)
        features = CreateJsonSource1(data)
        history.push("/map/?exp="+Params.exp+"&salary="+Params.salary+"&search="+name)
    }
    else if(Params.search){
        data = await FiterData('', '', name)
        features = CreateJsonSource1(data)
        history.push("/map/?search="+name)
    }
    else if(Params.salary){
        data = await FiterData(Params.salary, '',name)
        features = CreateJsonSource1(data)
        history.push("/map/?salary="+Params.salary+"&search="+name)
    }
    else if(Params.exp){
        data = await FiterData('', Params.exp, name)
        features = CreateJsonSource1(data)
        history.push("/map/?exp="+Params.exp+"&search="+name)
    }
    this.addSource(features)
    if (features === []) {
        this.setState({
            list: [],
            filter: []
        })
    }
    else {
        this.setState({
            list: features,
            features : features
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

    console.log(Params);
    var list = document.getElementsByClassName("suggestionbox")[0]
    list.innerHTML = ''
    document.getElementById('suggestion').value = ''
    document.getElementsByClassName('mapboxgl-ctrl-geocoder--input')[0].value = ''

}

export async function hendelexperience(experience) {
    var url = window.location.search
    var Params = queryString.parse(url)
    var data,features
    if(window.location.pathname === "/map" || window.location.pathname === "/map/" || window.location.pathname === "/recommended" || window.location.pathname === "/recommended/"){
        data = await FiterData('', experience, '')
        features = CreateJsonSource1(data)
        history.push("/map/?exp="+experience)   
    }
    else if(Params.exp && Params.salary && Params.search){
        data = await FiterData(Params.salary, experience, Params.search)
        features = CreateJsonSource1(data)
        history.push("/map/?exp="+experience+"&salary="+Params.salary+"&search="+Params.search)
    }
    else if(Params.exp && Params.salary){
        data = await FiterData(Params.salary, experience,'')
        features = CreateJsonSource1(data)
        history.push("/map/?exp="+experience+"&salary="+Params.salary)
    }
    else if(Params.exp && Params.search){
        data = await FiterData('', experience, Params.search)
        features = CreateJsonSource1(data)
        history.push("/map/?exp="+Params.exp+"&search="+Params.search)
    }
    else if(Params.salary && Params.search){
        data = await FiterData(Params.salary, experience, Params.search)
        features = CreateJsonSource1(data)
        history.push("/map/?exp="+experience+"&salary="+Params.salary+"&search="+Params.search)
    }
    else if(Params.exp){
        data = await FiterData('', experience, '')
        features = CreateJsonSource1(data)
        history.push("/map/?exp="+experience)
    }
    else if(Params.salary){
        data = await FiterData(Params.salary, experience,'')
        features = CreateJsonSource1(data)
        history.push("/map/?exp="+experience+"&salary="+Params.salary)
    }
    else if(Params.search){
        data = await FiterData('', experience, Params.search)
        features = CreateJsonSource1(data)
        history.push("/map/?salary="+Params.salary+"&search="+Params.search)
    }
    this.addSource(features)
    if (features === []) {
        this.setState({
            list: [],
            filter: []
        })
    }
    else {
        this.setState({
            experiencefilter: experience,
            filter: features,
            features : features
        })
    }
    console.log(features);
}

export async function hendelsalary(salary) {
    
    var url = window.location.search
    var Params = queryString.parse(url)
    var data,features
    if(window.location.pathname === "/map" || window.location.pathname === "/map/" || window.location.pathname === "/recommended" || window.location.pathname === "/recommended/"){
        data = await FiterData(salary, '', '')
        features = CreateJsonSource1(data)
        history.push("/map/?salary="+salary)   
    }
    else if(Params.exp && Params.salary && Params.search){
        data = await FiterData(Params.exp, Params.salary, Params.search)
        features = CreateJsonSource1(data)
        history.push("/map/?exp="+Params.exp+"&salary="+salary+"&search="+Params.search)
    }
    else if(Params.salary && Params.exp){
        data = await FiterData(salary, Params.exp,'')
        features = CreateJsonSource1(data)
        history.push("/map/?exp="+Params.exp+"&salary="+salary)
    }
    else if(Params.salary && Params.search){
        data = await FiterData(salary, '', Params.search)
        features = CreateJsonSource1(data)
        history.push("/map/?salary="+salary+"&search="+Params.search)
    }
    else if(Params.exp && Params.search){
        data = await FiterData(salary, Params.exp, Params.search)
        features = CreateJsonSource1(data)
        history.push("/map/?exp="+Params.exp+"&salary="+salary+"&search="+Params.search)
    }
    else if(Params.salary){
        data = await FiterData(salary, '', '')
        features = CreateJsonSource1(data)
        history.push("/map/?salary="+salary)
    }
    else if(Params.exp){
        data = await FiterData(salary, Params.exp,'')
        features = CreateJsonSource1(data)
        history.push("/map/?exp="+Params.exp+"&salary="+salary)
    }
    else if(Params.search){
        data = await FiterData(salary, '', Params.search)
        features = CreateJsonSource1(data)
        history.push("/map/?salary="+salary+"&search="+Params.search)
    }
    this.addSource(features)
    if (features === []) {
        this.setState({
            list: [],
            filter: []
        })
    }
    else {
        this.setState({
            salaryfilter: salary,
            filter: features,
            features : features
        })
    }
    console.log(features);
}

export function hendelHomeSearch(){

    var name = document.getElementById('suggestion').value
    history.push('/map/?search='+ name)
    window.location.reload()

}

export function hendelRecommended(){

    history.push('/recommended')
    window.location.reload()

}

export async function hendelSuggestionlistName() {
    
    var value = document.getElementById('suggestion').value
    var list = document.getElementsByClassName("suggestionbox")[0]
    var suggestion = await SuggestionNameData(value)
    if (value.length > 0) {
        console.log(suggestion);
        list.innerHTML = ''
        var arr = []
        suggestion.forEach(item => {
            var fname = (item.fname).toUpperCase()
            var lname = (item.lname).toUpperCase()
            if (fname.includes(value.toUpperCase()) === true && item.fname !== '') {
                if (arr.includes(item.fname) !== true) {
                    var li = document.createElement('li')
                    li.className = 'suggestionlist'
                    li.innerText = item.fname
                    arr.push(item.fname)
                    li.onclick = () => {
                        document.getElementById('suggestion').value = item.fname
                        list.innerHTML = ''
                    }
                    list.appendChild(li);
                }
            }
            else if (lname.includes(value.toUpperCase()) === true && item.lname !== '') {
                if (arr.includes(item.lname) !== true) {
                    var li = document.createElement('li')
                    li.className = 'suggestionlist'
                    li.innerHTML = item.lname
                    arr.push(item.lname)
                    li.onclick = () => {
                        document.getElementById('suggestion').value = item.lname
                        list.innerHTML = ''
                    }
                    list.appendChild(li);
                }
            }
        })

    }
    else {
        list.innerHTML = ''
    }
}

export async function hendelSearchName(map){

    var url = window.location.search
    var Params = queryString.parse(url)
    var data,features
    var name = document.getElementById('suggestion').value
    data = await FilterNameData(name)
    console.log(data);
    features = CreateJsonSource2(data)
    history.push("/jobseeker/?search="+name)   
    this.addSource(features)
    if (name.length === 0) {
        this.setState({
            list: [],
            filter: []
        })
    }
    else {
        this.setState({
            list: features,
            features : features
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

export async function hendeluserexperience(experience){
    var url = window.location.search
    var Params = queryString.parse(url)
    var data,features
    if(window.location.pathname === "/jobseeker" || window.location.pathname === "/jobseeker/"){
        data = await FilterNameData(experience, '')
        features = CreateJsonSource2(data)   
    }
    else if(Params.search){
        data = await FilterNameData(experience, Params.search)
        features = CreateJsonSource2(data)
        history.push("/jobseeker/?search="+Params.search)
    }
    this.addSource(features)
    if (experience.length === 0) {
        this.setState({
            list: [],
            filter: []
        })
    }
    else {
        this.setState({
            experiencefilter: experience,
            filter: features,
            features : features
        })
    }
}