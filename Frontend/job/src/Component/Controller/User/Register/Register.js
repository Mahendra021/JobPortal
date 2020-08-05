import React, { Component } from 'react'
import RegisterView from '../../../View/User/Register/RegisterView'

export class Register extends Component {
    render() {
        return (
            <div>
                <RegisterView {...this.props} />
            </div>
        )
    }
}

export default Register
