import React, { Component } from 'react'
import RegisterView from '../../../View/Recruiter/Register/RegisterView'

export default class CompanyRegister extends Component {
    render() {
        return (
            <div>
                <RegisterView {...this.props} />
            </div>
        )
    }
}
