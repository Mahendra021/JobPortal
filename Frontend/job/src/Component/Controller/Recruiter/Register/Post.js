import React, { Component } from 'react'
import PostView from '../../../View/Recruiter/Register/PostView'

export class Post extends Component {
    render() {
        return (
            <div>
                <PostView {...this.props} />
            </div>
        )
    }
}

export default Post
