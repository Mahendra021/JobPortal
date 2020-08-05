import React, { Component } from 'react'
import ProfileView from '../../../View/Recruiter/Profile/ProfileView'

export class Profile extends Component {
    render() {
        return (
            <div>
                <ProfileView {...this.props} />
            </div>
        )
    }
}

export default Profile
