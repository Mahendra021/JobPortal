import React, { Component } from 'react'
import './Assets/Login.css'
import { NavLink,Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../../../store/actions/auth'
import {createBrowserHistory} from 'history';

var history = createBrowserHistory()

export class LoginView extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: ''
        }
    }
    heandelsubmit() {
        this.props.onAuth(this.state.email, this.state.password)

        if(document.getElementById("error")){
            var error = document.getElementById("error")
            error.remove()
            console.log(5);
        }
        if(this.props.isAuthenticated === false){
            var error = document.createElement("p")
            console.log(6);
            error.id = "error"
            error.innerHTML = "Invalid details. Please check the Email ID - Password combination."
            document.getElementById("err").appendChild(error)
        }

    } 
    render() {

        if (this.props.isAuthenticated) {
            return <Redirect to="/user" />;
        }
        return (
            <div>
                <div className='header'>
                    <div className="container1">
                        <div style={{ float: 'left' }} className="headertitel">NAME</div>
                        <NavLink style={{ float: 'right' }} className="employerlogin" to='/recruit/login'>FOR EMPLOYER</NavLink>
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
                            <NavLink className="signuplink" to="/account/register/basicdetail">
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
        
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(LoginView)
