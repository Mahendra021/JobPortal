import React, { Component } from 'react'
import EducationView from '../../../View/User/Register/EducationView'

export class Education extends Component {
    render() {
        return (
            <div>
                <EducationView {...this.props} />
            </div>
        )
    }
}

export default Education