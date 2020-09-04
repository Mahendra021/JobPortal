import React, { Component } from 'react'
import queryString from 'query-string'
import "../Profile/Assets/profile.css"
import { Redirect } from "react-router-dom"
import {JobIdData, CompanyData} from '../../../Model/JobData'
import { ownerdata } from '../../../Model/UserData'
import {createBrowserHistory} from 'history';

var history = createBrowserHistory()

export class ProfileCompanyView extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             data:[],
        }
    }

    async componentWillMount(){

        var token = localStorage.getItem('token')
        console.log(token);
        var owner = await ownerdata(token)
        var pk = owner.id
        console.log(pk);
        var comp = await CompanyData(pk)
        var id = comp[0].id
        console.log(comp);

        var data = await JobIdData(id)
        this.setState({
            data: data
        });
        console.log(data)
    }

    hendeleditcomp(){

        history.push('company/register')
        window.location.reload()
    }
    
    render() {
        if (this.props.isAuthenticated===false) {
            return <Redirect to="/" />;
        }
        return (
            <div>
                <ul>
                    <li className="listCompany">Name</li>
                </ul>
                <div className="waper">
                    {this.state.data.length !== 0 ? <img className="profile" src={'/images/' + this.state.data.image[0].source + '.jpg'} /> : null}
                    <div style={{ float: "left" }}>
                        <div className="mainDetail2">
                            <h5>About us</h5>
                            Description : {this.state.data.about}<br />
                            Founded : {this.state.data.date_start}<br />
                            Working Time : {this.state.data.working_hour}<br />
                            Working Day : {this.state.data.working_day}<br />
                            <div style={{float:"right"}} onClick={()=>this.hendeleditcomp()}>
                                Edit
                            </div>
                        </div>
                        <div className="mainDetail2" style={{marginTop:"20px"}}>
                            <h5>Jobs</h5>
                            <div className="joblist" onClick={()=>this.hendeljob()}>
                                <div className="white-space">job Description : {this.state.data.length !== 0 ? this.state.data.job[0].description : null}</div>
                                Selery : {this.state.data.length !== 0 ? this.state.data.job[0].salary : null}<br />
                                Job Type : {this.state.data.length !== 0 ? this.state.data.job[0].job_type : null}<br />
                            </div>
                            <div className="joblist" onClick={()=>this.hendeljob()}>
                                <div className="white-space">job Description : {this.state.data.length !== 0 ? this.state.data.job[0].description : null}</div>
                                Selery : {this.state.data.length !== 0 ? this.state.data.job[0].salary : null}<br />
                                Job Type : {this.state.data.length !== 0 ? this.state.data.job[0].job_type : null}<br />
                            </div>
                            <div className="joblist" onClick={()=>this.hendeljob()}>
                                <div className="white-space">job Description : {this.state.data.length !== 0 ? this.state.data.job[0].description : null}</div>
                                Selery : {this.state.data.length !== 0 ? this.state.data.job[0].salary : null}<br />
                                Job Type : {this.state.data.length !== 0 ? this.state.data.job[0].job_type : null}<br />
                            </div>
                            <div className="joblist" onClick={()=>this.hendeljob()}>
                                <div className="white-space">job Description : {this.state.data.length !== 0 ? this.state.data.job[0].description : null}</div>
                                Selery : {this.state.data.length !== 0 ? this.state.data.job[0].salary : null}<br />
                                Job Type : {this.state.data.length !== 0 ? this.state.data.job[0].job_type : null}<br />
                            </div>
                            <div className="joblist" onClick={()=>this.hendeljob()}>
                                <div className="white-space">job Description : {this.state.data.length !== 0 ? this.state.data.job[0].description : null}</div>
                                Selery : {this.state.data.length !== 0 ? this.state.data.job[0].salary : null}<br />
                                Job Type : {this.state.data.length !== 0 ? this.state.data.job[0].job_type : null}<br />
                            </div>
                            <div style={{textAlign:"right"}}><a>View All</a></div>
                        </div>
                        <div className="mainDetail2" style={{marginTop:"20px"}}>
                            <h5>Video</h5>
                        </div>
                    </div>
                    <div style={{float:"left"}}>
                        <div className="mainDetail3">
                            <div>Share</div>
                        </div>
                        <div className="mainDetail3" style={{marginTop:"20px", minHeight:"500px"}}>
                            <div>
                            {this.state.data.length !== 0 ? <img className="profile" src={'/images/' + this.state.data.image[0].source + '.jpg'} /> : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfileCompanyView
