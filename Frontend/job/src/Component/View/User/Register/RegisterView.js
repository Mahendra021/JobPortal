import React, { Component, useState } from 'react'
import { creatuser, creataddress, uploadresume } from '../../../Model/UserUploadData'
import './Assets/register.css'
import * as actions from '../../../../store/actions/auth'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import {createBrowserHistory} from 'history';

var history = createBrowserHistory()

export class RegisterView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fname: '', lname: '', email: '', password1: '', password2: '',
            moblie: '', address: '', area: '',
            city: '', state: '', pin: '',
            country: '', file: null, TandC: false
        }
    }
    async hendelregister() {

        console.log(this.state);

        var jsonObject1 = {
            fname: this.state.fname,
            lname: this.state.lname,
            email: this.state.email,
            mobile: this.state.moblie
        }

        var userdata = await creatuser(jsonObject1)
        var id = userdata.id

        // console.log(id);

        var jsonObject2 = {
            user_id: id,
            fname: this.state.fname,
            lname: this.state.lname,
            local_addr: this.state.address,
            local_area_name: this.state.area,
            city: this.state.city,
            state: this.state.state,
            country: this.state.country,
            pincode: this.state.pin
        }

        var addressdata = await creataddress(jsonObject2)

        const jsonObject3 = new FormData()
        jsonObject3.append('source', this.state.file, this.state.file.name);
        jsonObject3.append('user_id', id);

        // const jsonObject3 =  this.state.file

        console.log(jsonObject3);

        var resume = await uploadresume(jsonObject3)

        this.props.onAuth(
            this.state.fname + this.state.lname,
            this.state.email,
            this.state.password1,
            this.state.password2
        )

        history.push('/account/register/education')
        window.location.reload()

    }

    render() {
        
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />;
        }
        return (
            <div>
                <div><h3 style={{ textAlign: 'center' }}>Job Search..</h3></div>
                <div className='banner' style={{ textAlign: 'center' }}>
                    <div style={{ display: 'inline-block' }} className="activ">Personal<em></em></div>
                    <div style={{ display: 'inline-block' }}>Education<em></em></div>
                </div>
                <div className="warp">
                    <div>
                        <div style={{ marginBottom: '10px' }}>
                            <label className="left">First Name</label>
                            <input id='name' className="middle" placeholder="Enter your Full Name" onChange={(e) => { this.setState({ fname: e.target.value }) }} />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label className="left">Last Name</label>
                            <input id='name' className="middle" placeholder="Enter your Full Name" onChange={(e) => { this.setState({ lname: e.target.value }) }} />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label className="left mandatory">Email</label>
                            <input className="middle" placeholder="Enter your Email" onChange={(e) => { this.setState({ email: e.target.value }) }} />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label className=" left mandatory">Create Password</label>
                            <input className="middle" placeholder="Minimum 8 Characters" onChange={(e) => { this.setState({ password1: e.target.value }) }} />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label className=" left mandatory">Canform Password</label>
                            <input className="middle" placeholder="Minimum 8 Characters" onChange={(e) => { this.setState({ password2: e.target.value }) }} />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label className="left mandatory">Mobile number</label>
                            <input className="middle" placeholder="Where Recruiter can contact you" onChange={(e) => { this.setState({ moblie: e.target.value }) }} />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label className="left mandatory">Address</label>
                            <input className="address1" placeholder="Local Address" style={{ marginBottom: '10px' }} onChange={(e) => { this.setState({ address: e.target.value }) }} /><br />
                            <label className="left"></label>
                            <input className="address1" placeholder="Local Area Name" onChange={(e) => { this.setState({ area: e.target.value }) }} /><br />
                            <label className="left"></label>
                            <input className="address2" placeholder="City" onChange={(e) => { this.setState({ city: e.target.value }) }} />
                            <input className="address2" placeholder="State" onChange={(e) => { this.setState({ state: e.target.value }) }} /><br />
                            <label className="left"></label>
                            <input className="address3" placeholder="Pin code" onChange={(e) => { this.setState({ pin: e.target.value }) }} />
                            <input className="address3" placeholder="Country" onChange={(e) => { this.setState({ country: e.target.value }) }} />
                        </div>
                        <div>
                            <label className="left mandatory">Uploal Resume</label>
                            <div className="uplode-CV">
                                <button className="upresume">Uploal Resume</button>
                                <input type="file" name="Upload Resume" onChange={(e) => { this.setState({ file: e.target.files[0] }) }} />
                            </div>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label className="left"></label>
                            <small className="cvformat" >
                                doc, docx, rtf, pdf - 2MB max<br />
                                We preferred CV format - docx file
                                </small>
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
            </div >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, email, password1, password2) => dispatch(actions.authSignup(username, email, password1, password2))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(RegisterView)
