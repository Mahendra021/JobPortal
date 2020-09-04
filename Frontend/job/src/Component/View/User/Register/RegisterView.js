import React, { Component, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import { creatuser, creataddress, uploadsource } from '../../../Model/UserUploadData'
import './Assets/register.css'
import * as actions from '../../../../store/actions/auth'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import {createBrowserHistory} from 'history';
import { ownerdata } from '../../../Model/UserData'

var history = createBrowserHistory()
var globalThis = null

export class RegisterView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fname: '', lname: '', email: '', password: '',
            moblie: '', address: '', area: '',
            city: '', state: '', pin: '',xcoord:'',ycoord:'',
            country: '', file: null, TandC: false
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
    async hendelregister() {

        console.log(this.state);

        var username = this.state.email.split("@")[0];
        var usertype = "Jobseeker"

        var user = this.props.onAuth(
            username,
            this.state.email,
            usertype,
            this.state.password,
            this.state.password
        )

        var owner = await ownerdata(user)
        var pk = owner.id

        var jsonObject1 = {
            owner: pk,
            fname: this.state.fname,
            lname: this.state.lname,
            email: this.state.email,
            mobile: this.state.moblie,
            experians: 1
        }

        var userdata = await creatuser(jsonObject1)

        var jsonObject2 = {
            owner: pk,
            local_addr: this.state.address,
            local_area_name: this.state.area,
            city: this.state.city,
            state: this.state.state,
            country: this.state.country,
            pincode: this.state.pin,
            xcoord: 72.56393273009525,
            ycoord: 23.014916325369583
        }

        var addressdata = await creataddress(jsonObject2)

        const jsonObject3 = new FormData()
        jsonObject3.append('source', this.state.file, this.state.file.name);
        jsonObject3.append('owner', pk);

        await uploadsource(jsonObject3)

        if(this.state.email === ''){
            document.getElementById("email_err").innerHTML="Plass Enter valid Eamil"
        }
        if(this.state.local_addr === '' || this.state.local_area_name === '' || this.state.city === '' ||this.state.state === '' ||this.state.country === '' ||this.state.pin === '' ){
            document.getElementById("add_err").innerHTML="Plass Enter Address"
        }
        if(this.state.password === ''){
            document.getElementById("pass_err").innerHTML="Plass Enate Password"
        }
        if(this.state.moblie === ''){
            document.getElementById("mobile_err").innerHTML="Plass Enate Moblie Number"
        }

        if(this.state.email !== '' && this.state.password === '' && this.state.moblie === '' && this.state.TandC === true){
            history.push('/account/register/education')
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
            return <Redirect to="/user" />;
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
                            <div className="middle">
                                <input id='name' className="middelinput" placeholder="Enter your Full Name" onChange={(e) => { this.setState({ fname: e.target.value }) }} />
                            </div>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label className="left">Last Name</label>
                            <div className="middle">
                                <input id='name' className="middelinput" placeholder="Enter your Full Name" onChange={(e) => { this.setState({ lname: e.target.value }) }} />
                            </div>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label className="left mandatory">Email</label>
                            <div className="middle">
                                <input className="middelinput" placeholder="Enter your Email" onChange={(e)=>this.hendelemail(e.target.value)} />
                                <br/>
                                <span id="email_err" className="err"></span>
                            </div>
                        </div>
                        {/* <div style={{ marginBottom: '10px' }}>
                            <label className=" left mandatory">Create Password</label>
                            <div className="middle">
                                <input className="middelinput" placeholder="Minimum 8 Characters" onChange={(e) => { this.setState({ password1: e.target.value }) }} />
                            </div>
                        </div> */}
                        <div style={{ marginBottom: '10px' }}>
                            <label className=" left mandatory">Canform Password</label>
                            <div className="middle">
                                <input className="middelinput" placeholder="Minimum 8 Characters" onChange={(e)=>this.hendelpass(e.target.value)} />
                                <br/>
                                <span id="pass_err" className="err"></span>
                            </div>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label className="left mandatory">Mobile number</label>
                            <div className="middle">
                                <input className="middelinput" placeholder="Where Recruiter can contact you" onChange={(e)=>this.hendelmobile(e.target.value)} />
                                <br/>
                                <span id="mobile_err" className="err"></span>
                            </div>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label className="left mandatory">Address</label>
                            <div className="middle">
                                <input className="address1" placeholder="Local Address"  onChange={(e) => { this.setState({ address: e.target.value }) }} /><br />
                            </div>
                            <label className="left"></label>
                            <div className="middle">
                                <input className="address1" placeholder="Local Area Name" onChange={(e) => { this.setState({ area: e.target.value }) }} /><br />
                            </div>
                            <label className="left"></label>
                            <div className="middle">
                                <input className="address2" placeholder="City" onChange={(e) => { this.setState({ city: e.target.value }) }} />
                                <input className="address2" placeholder="State" onChange={(e) => { this.setState({ state: e.target.value }) }} /><br />
                            </div>
                            <label className="left"></label>
                            <div className="middle">
                                <input className="address3" placeholder="Pin code" onChange={(e) => { this.setState({ pin: e.target.value }) }} />
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
                        <div>
                            <label className="left mandatory">Uploal Resume</label>
                            <div className="uplode-CV">
                                <div className="middle" style={{marginBottom:'0px',width:'100%'}}>
                                    <button className="upresume">Uploal Resume</button>
                                    <input type="file" accept=".docx,.doc,.rtf,.pdf" name="Upload Resume" onChange={(e) => { this.setState({ file: e.target.files[0] }) }} />
                                    <span id="resume_err" className="err" style={{marginLeft:'10px'}}></span>
                                </div>
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
        onAuth: (username, email, usertype, password1, password2) => dispatch(actions.authSignup(username, email, usertype, password1, password2))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(RegisterView)
