import React, { Component } from 'react'
import './Assets/register.css'
import { Redirect } from 'react-router-dom'
import { AddCompany } from '../../../Model/JobUploadData';

export default class RegisterView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '', email: '', password1: '', password2: '',
            web: '', skype: '', founded: '', day: '',
            hour: '', employees: '', moblie: '', TandC: false
        }
    }
    async hendelregister() {
        console.log(this.state);
        
        var jsonObject1 = {
            name : this.state.name,
            email : this.state.email,
            website : this.state.web,
            skype_name : this.state.skype,
            date_start : this.state.founded,
            working_day : this.state.day,
            working_hour : this.state.hour,
            no_of_emp : this.state.employees,
            telephone : this.state.moblie
        }

        var company = await AddCompany(jsonObject1)

    }

    render() {

        if (this.props.isAuthenticated) {
            return <Redirect to="/" />;
        }
        return (
            <div>
                <div><h3 style={{ textAlign: 'center' }}>Job Search..</h3></div>
                <div className='banner1' style={{ textAlign: 'center' }}>
                    <div style={{ display: 'inline-block',width:'150px' }} className="activ">Compnay Detail<em style={{width:'142px'}}></em></div>
                </div>
                <div className="warp">
                    <div>
                        <div style={{ marginBottom: '10px' }}>
                            <label className="left mandatory">Company Name</label>
                            <input id='name' className="middle" placeholder="Enter your Company Name" onChange={(e) => { this.setState({ name: e.target.value }) }} />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label className="left mandatory">Email</label>
                            <input className="middle" placeholder="Enter your Email" onChange={(e) => { this.setState({ email: e.target.value }) }} />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label className="left mandatory">Create Password</label>
                            <input className="middle" placeholder="Minimum 8 Characters" onChange={(e) => { this.setState({ password1: e.target.value }) }} />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label className=" left mandatory">Confirm Password</label>
                            <input className="middle" placeholder="Confirm Password" onChange={(e) => { this.setState({ password2: e.target.value }) }} />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label className="left">Website</label>
                            <input className="middle" placeholder="Company Website" onChange={(e) => { this.setState({ web: e.target.value }) }} />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label className="left">Skype Name</label>
                            <input className="middle" placeholder="Enter Skype Name" onChange={(e) => { this.setState({ skype: e.target.value }) }} />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label className="left">Founded</label>
                            <input className="middle" placeholder="Date of Company Founded" onChange={(e) => { this.setState({ founded: e.target.value }) }} />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label className="left">Working Day</label>
                            <input className="middle" placeholder="Working Day of Company" onChange={(e) => { this.setState({ day: e.target.value }) }} />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label className="left">Working Hour</label>
                            <input className="middle" placeholder="Working Hour of Company" onChange={(e) => { this.setState({ hour: e.target.value }) }} />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label className="left">NO. of Employees</label>
                            <input className="middle" placeholder="Enter No. of Employees" onChange={(e) => { this.setState({ employees: e.target.value }) }} />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label className="left mandatory">Mobile number</label>
                            <input className="middle" placeholder="Where Jobseeker can contact you" onChange={(e) => { this.setState({ moblie: e.target.value }) }} />
                        </div>
                        <div>
                            <label className="left"></label>
                            <div style={{ display: 'inline-block', width: '41%' }}>
                                <input type="checkbox" onChange={(e) => { this.setState({ TandC: e.target.checked }) }} />
                                <label className="TandC">
                                    I agreed to the <a>Terms and Conditions</a> governing the use of (NAME).
                                    </label>
                                <div className="TandC" style={{ marginLeft: '23px' }}>
                                    I have reviewed the default <a>Mailer & Communications settings.</a>
                                </div>
                                <div className="submit-box"><button onClick={() => this.hendelregister()}>Register Now</button></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
