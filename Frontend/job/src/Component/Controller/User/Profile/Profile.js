import React, { Component } from 'react'
import ProfileView from '../../../View/User/Profile/ProfileView'

export class JobSeeker extends Component {
    render() {
        return (
            <div>
                <ProfileView {...this.props} />
            </div>
        )
    }
}

export default JobSeeker
