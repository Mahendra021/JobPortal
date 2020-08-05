import React, { Component } from 'react'
import LoginView from '../../../View/Recruiter/Login/LoginView'

export class RecruiterLogin extends Component {
    render() {
        return (
            <LoginView {...this.props} />
        )
    }
}

export default RecruiterLogin