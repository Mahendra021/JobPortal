import React, { Component } from 'react'
import { Link,Redirect } from 'react-router-dom'
import { hendelSuggestionlist,hendelHomeSearch } from '../MapPage/Filter'

export default class HomeView extends Component {
    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/user" />;
        }
        return (
            <div>
                <ul>
                    <li className="listCompany">Name</li>
                    <li key="2" id="login">
                        <Link to="/login">Login</Link>
                    </li>
                </ul>
                <div className="home">
                    <div className="homesearch">
                        <samp>Search Jobs</samp><br/>
                        <ul style={{height:'50px'}}>
                            <li style={{width:'80%'}}><input type="text" id="suggestion" onChange={() => hendelSuggestionlist.call(this)} placeholder="Skill,Company,Post,etc.." name="search" />
                                <div style={{top:'154px',width:'50%'}} className="suggestionhendel">
                                    <ul className="suggestionbox"></ul>
                                </div>
                            </li>
                            <li className="searchbotton" onClick={() => hendelHomeSearch.call(this)}>Search</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
