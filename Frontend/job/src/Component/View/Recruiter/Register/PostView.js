import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl'
import { Redirect } from 'react-router-dom'
import Select from "react-dropdown-select";
import {createBrowserHistory} from 'history';
import { AddPostJob, AddCompanyAddress } from '../../../Model/JobUploadData';

var history = createBrowserHistory()
var globalThis = null
const options = [
    { value: 'Full Time', label: 'Full Time' },
    { value: 'Part Time', label: 'Part Time' },
    { value: 'Intership', label: 'Intership' } 
];

export class PostView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            titel: '', type: '',role: '',salary:'',
            experience: '',address: '',area: '',city: '',state: '',
            pin: '',country: '',description: '' ,
            labelField: "label",valueField: "value",
        }

        globalThis = this
    }

    async componentDidMount() {

        var map = new mapboxgl.Map({
            container: 'map1', // container id
            style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
            center: [72.5714, 23.0225], // starting position [lng, lat]
            zoom: 14 // starting zoom
        });
    
        map.on('click',  function (e) {;

            globalThis.setState({
                xcoord : e.lngLat.lng,
                ycoord : e.lngLat.lat
            })

            console.log(globalThis.state);

            document.getElementsByClassName('mapview')[0].style.display="none"
            
        });

        document.getElementsByClassName('mapview')[0].style.display="none"
        
    }

    async hendelregister(){
        console.log(this.state);

        var josnObject1 = {
            titel : this.state.titel,
            job_type : this.state.type,
            salary : this.state.salary,
            experience : this.state.experience,
            description : this.state.description
        }
        var josnObject2 = {
            local_addr : this.state.area,
            city : this.state.city,
            state : this.state.state,
            pin : this.state.pin,
            country : this.state.country,
        }

        var post =  await AddPostJob(josnObject1)
        var address = await AddCompanyAddress(josnObject2)

        if(this.state.titel === ''){
            document.getElementById("titel_err").innerHTML="This field may not be blank."
        }
        if(this.state.role === ''){
            document.getElementById("role_err").innerHTML="This field may not be blank."
        }
        if(this.state.salary === ''){
            document.getElementById("salary_err").innerHTML="This field may not be blank."
        }
        if(this.state.experience === ''){
            document.getElementById("expe_err").innerHTML="This field may not be blank."
        }
        if(this.state.local_addr === '' || this.state.city === '' ||this.state.state === '' || this.state.country === '' ||this.state.pin === '' ){
            document.getElementById("add_err").innerHTML="Address field may not be blank."
        }
        if(this.state.description === ''){
            document.getElementById("desc_err").innerHTML="This field may not be blank."
        }
        if(this.state.titel !== '' &&  this.state.type !== '' && this.state.role !== '' && this.state.salary !== '' && this.state.experience !== '' && this.state.local_addr !== '' && this.state.description !== ''){
            history.push("/compnay/profile")
            window.location.reload()
        }
    }

    render() {
        // if (this.props.isAuthenticated===false) {
        //     return <Redirect to="/company/register" />;
        // }
        return (
            <div>
                <div><h3 style={{ textAlign: 'center' }}>Job Search..</h3></div>
                <div className='banner1' style={{ textAlign: 'center' }}>
                    <div style={{ display: 'inline-block' }} className="activ">POST JOB<em></em></div>
                </div>
                <div className="warp">
                    <div>
                        <div style={{ marginBottom: '10px' }}>
                            <label className="left mandatory">Job Titel</label>
                            <div className="middle">
                            <input className="middelinput" placeholder="Enter your Job Titel" onChange={(e) => { this.setState({ titel: e.target.value }) }} />
                            <br/>
                                <span id="titel_err" className="err"></span>
                            </div>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label className="left mandatory">Job Type</label>
                            <div className="middle" style={{height:"43px"}}>
                                <Select placeholder="Working Day of Company" labelField={this.state.labelField} valueField={this.state.valueField} options={options} onChange={(e) => { this.setState({ type: e.target.value }) }} />
                                <br/>
                                <span id="type_err" className="err"></span>
                            </div>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label className="left mandatory">Role</label>
                            <div className="middle">
                            <input className="middelinput" placeholder="Enter Role in Job" onChange={(e) => { this.setState({ role: e.target.value }) }} />
                            <br/>
                                <span id="role_err" className="err"></span>
                            </div>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label className=" left mandatory">Monthy Salary(CTC)</label>
                            <div className="middle">
                            <input className="middelinput" type="number" placeholder="Monthy Salary in Job" onChange={(e) => { this.setState({ salary: e.target.value }) }} />
                            <br/>
                                <span id="salary_err" className="err"></span>
                            </div>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label className="left mandatory">Experience</label>
                            <div className="middle">
                            <input className="middelinput" type="number" placeholder="Requred Experience in Job" onChange={(e) => { this.setState({ experience: e.target.value }) }} />
                            <br/>
                                <span id="expe_err" className="err"></span>
                            </div>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label className="left mandatory">Address</label>
                            <div className="middle">
                            <input className="address1" placeholder="Adderss" onChange={(e) => { this.setState({ area: e.target.value }) }} /><br />
                            </div>
                            <label className="left"></label>
                            <div className="middle">
                            <input className="address2" placeholder="City" onChange={(e) => { this.setState({ city: e.target.value }) }} />
                            <input className="address2" placeholder="State" onChange={(e) => { this.setState({ state: e.target.value }) }} /><br />
                            </div>
                            <label className="left"></label>
                            <div className="middle">
                            <input className="address3" placeholder="Pin code" type="number" onChange={(e) => { this.setState({ pin: e.target.value }) }} />
                            <input className="address3" placeholder="Country" onChange={(e) => { this.setState({ country: e.target.value }) }} />
                            <span className="cordinet" onClick={()=>{document.getElementsByClassName('mapview')[0].style.display = 'block'}}>
                                Open Map
                            </span>
                            <br/>
                                <span id="add_err" className="err"></span>
                            </div>
                            <div className="mapview">
                                <div id="map1"></div>
                            </div>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label className="left mandatory">Job Description</label>
                            <div className="middle">
                                <textarea className="middelinput" placeholder="Job Description in 700 Characters" onChange={(e) => { this.setState({ description: e.target.value }) }}>
                                </textarea>
                                <br/>
                                    <span id="desc_err" className="err"></span>
                            </div>
                        </div>
                        <div>
                            <label className="left"></label>
                            <div style={{ display: 'inline-block', width: '47%' }}>
                                <div className="submit-box"><button onClick={() => this.hendelregister()}>Post</button></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PostView
