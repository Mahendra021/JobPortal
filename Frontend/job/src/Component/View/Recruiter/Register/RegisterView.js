import React, { Component } from 'react'
import './Assets/register.css'
import { Redirect } from 'react-router-dom'
import * as actions from '../../../../store/actions/auth'
import { connect } from 'react-redux'
import {createBrowserHistory} from 'history';
import Select from "react-dropdown-select";
import { AddCompany } from '../../../Model/JobUploadData';

var history = createBrowserHistory()

const options1 = [
    { value: 'Mon To Fri', label: 'Mon To Fri' },
    { value: 'Mon To setur', label: 'Mon To setur' },
    { value: 'Mon To Sun', label: 'Mon To Sun' } 
];
const options2 = [
    { value: '9:00 AM To 7:00 PM', label: '9:00 AM To 7:00 PM' },
    { value: '9:30 AM To 7:30 PM', label: '9:30 AM To 7:30 PM' },
    { value: '10:00 AM To 7:00 PM', label: '10:00 AM To 7:00 PM' }
]

export class RegisterView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '', email: '', password: '',
            web: '', skype: '', founded: "2000-01-01", day: '',
            industry:'',function:'',
            hour: '', employees: 0, moblie: '', TandC: false,
            labelField: "label",valueField: "value",
        }
    }
    async hendelregister() {
        console.log(this.state);
        
        var username = this.state.email.split("@")[0];
        var usertype = "Jobseeker"

        this.props.onAuth(
            username,
            this.state.email,
            usertype,
            this.state.password,
            this.state.password
        )

        var jsonObject1 = {
            name : this.state.name,
            emial : this.state.email,
            website : this.state.web,
            skype_name : this.state.skype,
            date_start : this.state.founded,
            working_day : this.state.day,
            working_hour : this.state.hour,
            no_of_emp : this.state.employees,
            telephone : this.state.moblie
        }

        if(this.state.email === ''){
            document.getElementById("email_err").innerHTML="Plass Enter valid Email"
        }
        if(this.state.name === ''){
            document.getElementById("name_err").innerHTML="Plass Enter valid Company Name"
        }
        if(this.state.password === '' ){
            document.getElementById("pass_err").innerHTML="Plass Enate Password"
        }
        if(this.state.moblie === ''){
            document.getElementById("mobile_err").innerHTML="Plass Enate Moblie Number"
        }
        var company = await AddCompany(jsonObject1)

        if(this.state.email !== '' && this.state.name !== '' && this.state.password !== '' && this.state.moblie !== ''){
            history.push('/jobpost')
            window.location.reload()
        }

    }

    hendelemail(email){

        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            this.setState({
                email : email
            })
            document.getElementById("email_err").innerHTML=""            
        }
        else{
            this.setState({
                email : ""
            })
            document.getElementById("email_err").innerHTML="Entered Email is not valid"
            if(email === ""){
                document.getElementById("email_err").innerHTML=""
            }
        }
    }
    hendelpass(pass){

        if(/^(?=.*\d)(?=.*[a-z]).{8,50}$/.test(pass)){
            this.setState({
                password : pass
            })
            document.getElementById("pass_err").innerHTML=""            
        }
        else{
            this.setState({
                password : ""
            })
            if(!/[0-9]/g.test(pass)){
                document.getElementById("pass_err").innerHTML="Entered Password at least one number"
                if(pass === ""){
                    document.getElementById("pass_err").innerHTML=""
                }
            }
            else if(!/[a-z]/g.test(pass)){
                document.getElementById("pass_err").innerHTML="Entered Password at least one characters"
                if(pass === ""){
                    document.getElementById("pass_err").innerHTML=""
                }
            }
            else{
                document.getElementById("pass_err").innerHTML="Password must be 8 characters minimum"
            }
        }
    }
    hendelmobile(num){

        if(/^\d{10}$/.test(num)){
            this.setState({
                moblie : num
            })
            document.getElementById("mobile_err").innerHTML=""            
        }
        else{
            this.setState({
                moblie : ""
            })
            document.getElementById("mobile_err").innerHTML="Entered Mobile Number is not valid"
            if(num === ""){
                document.getElementById("mobile_err").innerHTML=""
            }
        }
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
                    <div style={{ marginBottom: '10px' }}>
                        <label className="left mandatory">Company Name</label>
                        <div className="middle">
                            <input id='name'className="middelinput" placeholder="Enter your Company Name" onChange={(e) => { this.setState({ name: e.target.value }) }} />
                            <br/>
                            <span id="name_err" className="err"></span>
                        </div>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label className="left mandatory">Email</label>
                        <div className='middle'>
                            <input className="middelinput" type="email" placeholder="Enter your Email" onChange={(e)=>this.hendelemail(e.target.value)}/>
                            <br/>
                            <span id="email_err" className="err"></span>
                        </div>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label className="left mandatory">Create Password</label>
                        <div className="middle">
                            <input className="middelinput" placeholder="Minimum 8 Characters" onChange={(e)=>this.hendelpass(e.target.value)} />
                            <br/>
                            <span id="pass_err" className="err"></span>
                        </div>                        
                    </div>
                    {/* <div style={{ marginBottom: '10px' }}>
                        <label className=" left mandatory">Confirm Password</label>
                        <div className="middle">
                            <input className="middelinput" placeholder="Confirm Password" onChange={(e) => { this.setState({ password2: e.target.value }) }} />
                            <br/>
                            <span id="pass_err2" className="err"></span>
                        </div>
                    </div> */}
                    <div style={{ marginBottom: '10px' }}>
                        <label className="left">Website</label>
                        <div className="middle">
                            <input className="middelinput" placeholder="Company Website" onChange={(e) => { this.setState({ web: e.target.value }) }} />
                        </div>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label className="left">Skype Name</label>
                        <div className="middle">
                            <input className="middelinput" placeholder="Enter Skype Name" onChange={(e) => { this.setState({ skype: e.target.value }) }} />
                        </div>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label className="left">Founded</label>
                        <div className="middle">
                            <input className="middelinput" type="date" placeholder="Date of Company Founded" onChange={(e) => { this.setState({ founded: e.target.value }) }} />
                        </div>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label className="left">Industry</label>
                        <div className="middle">
                            <input className="middelinput" placeholder="Company Industry" onChange={(e) => { this.setState({ industry: e.target.value }) }} />
                        </div>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label className="left">Function</label>
                        <div className="middle">
                            <input className="middelinput" placeholder="Company Function" onChange={(e) => { this.setState({ function: e.target.value }) }} />
                        </div>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label className="left">Working Day</label>
                        <div className="middle">
                            <Select placeholder="Working Day of Company" labelField={this.state.labelField} valueField={this.state.valueField} options={options1} onChange={(e) => { this.setState({ day: e[0].value }) }} />
                        </div>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label className="left">Working Hour</label>
                        <div className="middle">
                            <Select placeholder="Working Hour of Company" labelField={this.state.labelField} valueField={this.state.valueField} options={options2} onChange={(e) => { this.setState({ hour: e[0].value }) }} />
                        </div>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label className="left">NO. of Employees</label>
                        <div className="middle">
                            <input className="middelinput" type="number" placeholder="Enter No. of Employees" onChange={(e) => { this.setState({ employees: e.target.value }) }} />
                        </div>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label className="left mandatory">Mobile number</label>
                        <div className="middle">
                            <input className="middelinput"  maxLength="10" placeholder="Where Jobseeker can contact you" onChange={(e)=>this.hendelmobile(e.target.value)} />
                            <br/>
                            <span id="mobile_err" className="err"></span>
                        </div>
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
                            <div className="submit-box">
                                <button onClick={() => this.hendelregister()}>Register Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
        onAuth: (username, email, usertype, password1, password2) => dispatch(actions.authSignup(username, email, usertype, password1, password2))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(RegisterView)