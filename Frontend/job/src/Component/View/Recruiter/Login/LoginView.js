import React, { Component } from 'react'
import './Assets/Login.css'
import { NavLink, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../../../store/actions/auth'

export class LoginView extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: ''
        }
    }
    heandelsubmit() {
        console.log(this.state);
        this.props.onAuth(this.state.email, this.state.password)
        return <Redirect to="/" />
    }
    logout() {
        this.props.logout()
    }

    render() {
        return (
            <div>
                <div className='header'>
                    <div className="container1">
                        <div style={{ float: 'left' }} className="headertitel">NAME</div>
                        <div style={{ float: 'left' }} onClick={() => this.logout()}>Log Out</div>
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
                            <NavLink className="signuplink" to="/recruit/register">
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