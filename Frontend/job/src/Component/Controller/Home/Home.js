import React, { Component } from 'react'
import HomeView from '../../View/Home/HomeView'

export default class Home extends Component {
    render() {
        return (
            <HomeView {...this.props} />
        )
    }
}
