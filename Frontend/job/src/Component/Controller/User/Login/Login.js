import React, { Component } from 'react'
import LoginView from '../../../View/User/Login/LoginView'

export class Login extends Component {
    render() {
        return (
            <LoginView {...this.props} />
        )
    }
}

export default Login
