import React, { Component } from 'react'
import "../Profile/Assets/profile.css"
import {JobIdData} from '../../../Model/JobData'

export class ProfileView extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             data:[],
        }
    }

    async componentWillMount(){

        var data = await JobIdData(1)
        this.setState({
            data: data
        });
        console.log(data)
    }
    
    render() {
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
                        </div>
                        <div className="mainDetail2" style={{marginTop:"20px"}}>
                            <h5>Jobs</h5>
                            <div className="joblist">
                                <div className="white-space">job Description : {this.state.data.length !== 0 ? this.state.data.job[0].description : null}</div>
                                Selery : {this.state.data.length !== 0 ? this.state.data.job[0].salary : null}<br />
                                Job Type : {this.state.data.length !== 0 ? this.state.data.job[0].job_type : null}<br />
                            </div>
                            <div className="joblist">
                                <div className="white-space">job Description : {this.state.data.length !== 0 ? this.state.data.job[0].description : null}</div>
                                Selery : {this.state.data.length !== 0 ? this.state.data.job[0].salary : null}<br />
                                Job Type : {this.state.data.length !== 0 ? this.state.data.job[0].job_type : null}<br />
                            </div>
                            <div className="joblist">
                                <div className="white-space">job Description : {this.state.data.length !== 0 ? this.state.data.job[0].description : null}</div>
                                Selery : {this.state.data.length !== 0 ? this.state.data.job[0].salary : null}<br />
                                Job Type : {this.state.data.length !== 0 ? this.state.data.job[0].job_type : null}<br />
                            </div>
                            <div className="joblist">
                                <div className="white-space">job Description : {this.state.data.length !== 0 ? this.state.data.job[0].description : null}</div>
                                Selery : {this.state.data.length !== 0 ? this.state.data.job[0].salary : null}<br />
                                Job Type : {this.state.data.length !== 0 ? this.state.data.job[0].job_type : null}<br />
                            </div>
                            <div className="joblist">
                                <div className="white-space">job Description : {this.state.data.length !== 0 ? this.state.data.job[0].description : null}</div>
                                Selery : {this.state.data.length !== 0 ? this.state.data.job[0].salary : null}<br />
                                Job Type : {this.state.data.length !== 0 ? this.state.data.job[0].job_type : null}<br />
                            </div>
                            <div style={{textAlign:"right"}}><a href>View All</a></div>
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

export default ProfileView
