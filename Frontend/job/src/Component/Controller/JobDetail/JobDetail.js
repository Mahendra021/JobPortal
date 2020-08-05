import React, { Component } from 'react'
import JobDetailView from '../../View/JobDetail/JobDetailView'

export class JobDetail extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    render() {
        return (
            <JobDetailView {...this.props} />
        )
    }
}

export default JobDetail
