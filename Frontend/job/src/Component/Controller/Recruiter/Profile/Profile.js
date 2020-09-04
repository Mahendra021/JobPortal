import React, { Component } from 'react'
import ProfileView from '../../../View/Recruiter/Profile/ProfileView'
import ProfileCompanyView from '../../../View/Recruiter/Profile/ProfileCompanyView'

export class Profile extends Component {
    render() {
        if(window.location.pathname === "/company/profile" || window.location.pathname === '/company/profile/'){
            console.log("abc");
            return (
                <div>    
                    <ProfileCompanyView {...this.props} />
                </div>
            )
        }
        else{
            console.log('cba');
            return (
                <div>    
                    <ProfileView {...this.props} />
                </div>
            )
        }
    }
}

export default Profile
