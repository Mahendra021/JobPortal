import React, { Component } from 'react'
import ProfileCopmletionView from '../../../View/User/Register/CompletionView'

export class ProfileCopmletion extends Component {
    render() {
        return (
            <div>
                <ProfileCopmletionView {...this.props} />
            </div>
        )
    }
}

export default ProfileCopmletion
