import React, { Component } from 'react'
import './Assets/Login.css'
import { NavLink, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../../../store/actions/auth'
import { ownerdata } from '../../../Model/UserData'
import {createBrowserHistory} from 'history';

var history = createBrowserHistory()

export class LoginView extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            user_type: ''
        }
    }
    
    async heandelsubmit() {

        var user = await this.props.onAuth(this.state.email, this.state.password)
        var owner = await ownerdata(user)
        this.setState({
            user_type: owner.user_type
        })

        if(document.getElementById("error")){
            var error = document.getElementById("error")
            error.remove()
            console.log(5);
        }

        if(owner.user_type !== "Company"){
            var error = document.createElement("p")
            console.log(6);
            error.id = "error"
            if(owner.email === undefined){
                error.innerHTML = "Invalid details. Please check the Email ID - Password combination."
            }
            else if(owner.user_type !== "Company"){
                error.innerHTML = "Invalid details. Please check the Email ID - Password combination. or You are using Jobseeker account"
                this.props.logout()
            }            
            document.getElementById("err").appendChild(error)
        }
        if(!document.getElementById("error")){
            history.push("/jobseeker")
            window.location.reload()
        }

    } 

    render() {
        if (this.state.user_type === "Company") {
            this.setState({
                user_type: ""
            })
            return <Redirect to="/jobseeker" />;
        }
        return (
            <div>
                <div className='header'>
                    <div className="container1">
                        <div style={{ float: 'left' }} className="headertitel">NAME</div>
                    </div>
                </div>
                <div className="login">
                    <div className="container1">
                        <div style={{ float: 'left' }} className="hidden">hello</div>
                        <div style={{ float: 'right' }} className="signinbox">
                            <h3>
                                <div>Hello!</div>
                                <div>Welcome Back</div>
                            </h3>
                            <div id="err"></div>
                            <div className="user">
                                <input type='txet' placeholder="User/E-mail" onChange={(e) => { this.setState({ email: e.target.value }) }}></input>
                            </div>
                            <div className="pass">
                                <input type='password' placeholder="Password" onChange={(e) => { this.setState({ password: e.target.value }) }}></input>
                            </div>
                            <div className="forgotpass">Forgot Password</div>
                            <div className="submit" onClick={() => this.heandelsubmit.call(this)}>Login</div>
                            <div className="or">OR</div>
                            <div className="otp">Login via OTP</div>
                            <NavLink className="signuplink" to="/company/register">
                                <div className="signup">New To Name? Sign Up</div>
                            </NavLink>
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
        onAuth: (email, password) => dispatch(actions.authLogin(email, password)),
        logout: () => dispatch(actions.logout())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginView)