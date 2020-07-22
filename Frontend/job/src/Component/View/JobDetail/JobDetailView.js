import React, { Component } from 'react'
import queryString from 'query-string'
import './Assets/jobdetail.css'
import { Link} from 'react-router-dom'
import { JobIdData } from '../../Model/JobData'

export class JobDetailView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: []
        }
    }
    async componentWillMount() {

        let url = window.location.search;
        let params = queryString.parse(url);

        var data = await JobIdData(params.id)
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
                    {
                    this.props.isAuthenticated ?
    
                    <li key="2" onClick={this.props.logout}>
                        Logout
                    </li>
    
                    :
    
                    <li key="2">
                        <Link to="/login">Login</Link>
                    </li>
                }
                </ul>
                <div className="canteiner">
                    <h4>About the Job in Detail</h4>
                    <div style={{float:"left"}}>
                        <div className="mainDetail1">
                            {this.state.data.length !== 0 ? this.state.data.job[0].title : null}<br/>
                            {this.state.data.name}<br />
                            <div style={{float:'left',marginRight:'10px'}}>Location : {this.state.data.length !== 0 ? this.state.data.address[0].city : null}</div>
                            <div style={{float:'left',marginRight:'10px'}}>Experience : {this.state.data.length !== 0 ? this.state.data.job[0].experience : null}</div>
                            <div>Selery : {this.state.data.length !== 0 ? this.state.data.job[0].salary : null}</div>
                        </div>
                        <div className="mainDetail1">
                            Job Description<br/>
                            {this.state.data.length !== 0 ? this.state.data.job[0].description : null}
                        </div>
                        <div className="mainDetail1">
                            Job Details<br/>
                            Industry : {this.state.data.length !== 0 ? this.state.data.company_depart[0].department : null}<br/>
                            Function : {this.state.data.length !== 0 ? this.state.data.company_depart[0].department : null}<br/>
                            Role : {this.state.data.length !== 0 ? this.state.data.company_depart[0].department : null}<br/>
                            {/* Skill : {this.state.data.length !== 0 ? this.state.data.job[0].jobskill[0].skill : null},
                            {this.state.data.length !== 0 ? this.state.data.job[0].jobskill[1].skill : null},
                            {this.state.data.length !== 0 ? this.state.data.job[0].jobskill[2].skill : null} */}
                        </div>
                    </div>
                    <div style={{float:"left"}}>
                        <div className="mainDetail3" style={{marginTop:'20px',minHeight:'450px'}}>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default JobDetailView
