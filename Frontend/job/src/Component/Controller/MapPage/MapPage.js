import React, { Component } from 'react';
import MapPageView from '../../View/MapPage/MapPageView';
import MapJobseekerPageView from '../../View/MapPage/MapJobseekerPageView'
import { connect } from 'react-redux'
import { withRouter,Link, Redirect } from 'react-router-dom'
import * as actions from '../../../store/actions/auth'

export class MapPage extends Component {
    constructor(props) {
        super(props)
        this.mapRef = React.createRef();
        this.state = {

        }
    }

    render() {
        if( window.location.pathname === "/jobseeker" || window.location.pathname === "/jobseeker/" ){
            
            // if(this.props.isAuthenticated===false){
            //     return <Redirect to='/recruit/login' />
            // }
            return (
                <div>
                    <ul style={{ borderBottom :'1px solid',height:'49px' }}>
                        <li className="listCompany">Name</li>
                        {
                            this.props.isAuthenticated ?
                            <li key="2" id="logout" onClick={this.props.logout}>
                                <div>Logout</div>
                            </li>
                            :
                            <div style={{float:'right'}}>
                                <li id="login" style={{paddingTop:'6px'}}>
                                    <Link className="employerlogin" to='/recruit/login'>FOR EMPLOYER</Link>
                                </li>
                                <li key="1" id="register">
                                    <Link to="/account/register/basicdetail">Register</Link>
                                </li>
                                <li key="2" id="login">
                                    <Link to="/login">Login</Link>
                                </li>
                            </div>
                        }
                    </ul>
                    <MapJobseekerPageView ref={this.mapRef} {...this.props} />
                </div>
            )
        }
        return (
            <div>
                <ul style={{ borderBottom :'1px solid',height:'49px' }}>
                    <li className="listCompany">Name</li>
                    {
                        this.props.isAuthenticated ?
                        <li key="2" id="logout" onClick={this.props.logout}>
                            <div>Logout</div>
                        </li>
                        :
                        <div style={{float:'right'}}>
                            <li id="login" style={{paddingTop:'6px'}}>
                                <Link className="employerlogin" to='/recruit/login'>FOR EMPLOYER</Link>
                            </li>
                            <li key="1" id="register">
                                <Link to="/account/register/basicdetail">Register</Link>
                            </li>
                            <li key="2" id="login">
                                <Link to="/login">Login</Link>
                            </li>
                        </div>
                    }
                </ul>
                <MapPageView ref={this.mapRef} {...this.props} />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout()) 
    }
}

export default withRouter(connect(null, mapDispatchToProps)(MapPage));
