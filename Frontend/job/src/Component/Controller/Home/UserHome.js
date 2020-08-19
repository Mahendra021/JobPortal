import React, { Component } from 'react'
import UserHomeview from '../../View/Home/UserHomeView'

export default class UserHome extends Component {

    render() {
        return (
                <UserHomeview {...this.props}/>
        )
    }
}
