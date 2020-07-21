import React, { Component } from 'react'
import { AddPostJob, AddCompanyAddress } from '../../../Model/JobUploadData';

export class PostView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            titel: '', type: '',role: '',salary:'',
            experience: '',address: '',area: '',city: '',state: '',
            pin: '',country: '',description: '' 
        }
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

        // var post =  await AddPostJob(josnObject1)
        // var address = await AddCompanyAddress(josnObject2)
 
    }

    render() {
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
                            <input id='name' className="middle" placeholder="Enter your Job Titel" onChange={(e) => { this.setState({ titel: e.target.value }) }} />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label className="left mandatory">Job Type</label>
                            <input className="middle" placeholder="Enter Job Type" onChange={(e) => { this.setState({ type: e.target.value }) }} />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label className="left mandatory">Role</label>
                            <input id='name' className="middle" placeholder="Enter Role in Jobe" onChange={(e) => { this.setState({ role: e.target.value }) }} />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label className=" left mandatory">Monthy Salary(CTC)</label>
                            <input className="middle" placeholder="Monthy Salary in Job" onChange={(e) => { this.setState({ salary: e.target.value }) }} />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label className="left mandatory">Experience</label>
                            <input className="middle" placeholder="Requred Experience in Job" onChange={(e) => { this.setState({ experience: e.target.value }) }} />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label className="left mandatory">Address</label>
                            <input className="address1" placeholder="Adderss" onChange={(e) => { this.setState({ area: e.target.value }) }} /><br />
                            <label className="left"></label>
                            <input className="address2" placeholder="City" onChange={(e) => { this.setState({ city: e.target.value }) }} />
                            <input className="address2" placeholder="State" onChange={(e) => { this.setState({ state: e.target.value }) }} /><br />
                            <label className="left"></label>
                            <input className="address3" placeholder="Pin code" onChange={(e) => { this.setState({ pin: e.target.value }) }} />
                            <input className="address3" placeholder="Country" onChange={(e) => { this.setState({ country: e.target.value }) }} />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label className="left mandatory">Job Description</label>
                            <input className="middle" placeholder="Job Description in 700 Characters" onChange={(e) => { this.setState({ description: e.target.value }) }} />
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
