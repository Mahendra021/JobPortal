import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { userdata, useraddress, usersource, higher_education, education } from '../../Model/UserData';
import { JobIdData } from '../../Model/JobData';
import { hendelSuggestionlist,hendelHomeSearch, hendelRecommended } from '../MapPage/Filter'
import '../Home/Assets/home.css';
import { hendelprofile } from './HendelProfile';
import * as actions from '../../../store/actions/auth'
// import {createBrowserHistory} from 'history';

// var history = createBrowserHistory()

export class HomeView extends Component {
    
    constructor(props) {
        super(props)
    
        this.state = {
            user:[],address:[],
            link:[],higher:[],
            edu:[],jobs:[],
        }
    }

    async componentWillMount(){

        var user = await userdata(1)
        var address = await useraddress()
        var link = await usersource()
        var higher = await higher_education()
        var edu = await education()
        var jobs = await JobIdData(1)

        this.setState({
            user: user,
            address:address,
            link:link,
            higher:higher,
            edu:edu,
            jobs:jobs,
        });
        console.log(this.state)
        
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
                <div className="homesearch">
                    <samp>Search Jobs</samp><br/>
                    <div style={{width:'663px',float:'left'}}>
                        <ul style={{height:'50px'}}>
                            <li style={{width:'80%'}}><input type="text" id="suggestion" onChange={() => hendelSuggestionlist.call(this)} placeholder="Skill,Company,Post,etc.." name="search" />
                                <div style={{top:'154px',width:'35.85%'}} className="suggestionhendel">
                                    <ul className="suggestionbox"></ul>
                                </div>
                            </li>
                            <li className="searchbotton" onClick={() => hendelHomeSearch.call(this)}>Search</li>
                        </ul>
                        <div className="re">Jobs</div>
                        <div className="re1">
                            <div className="r2">New Recommended Job(s)</div>
                            <div style={{borderTop:'solid 1px #ddd'}}></div>
                            <div style={{margin:'12px 15px 0px',fontSize:'17px'}}>{this.state.jobs.length !== 0 ? this.state.jobs.job[0].title : null }</div>
                            <div style={{margin:'0px 15px',fontSize:'15px'}}>{this.state.jobs.name}</div>
                            <div style={{margin:'0px 15px',fontSize:'13px',float:"left",width:'200px'}}> Experiance : {this.state.jobs.length !== 0 ? this.state.jobs.job[0].experience : null}</div>
                            <div style={{margin:'0px 15px',fontSize:'13px',float:"left",width:'200px'}}>Loaction : {this.state.jobs.length !== 0 ? this.state.jobs.address[0].city : null}</div>
                            <div style={{margin:'0px 15px',fontSize:'13px',width:'200px'}}>
                                Key Skill : {this.state.jobs.length !== 0 ? this.state.jobs.job[0].jobskill[0].skill : null},
                                {this.state.jobs.length !== 0 ? this.state.jobs.job[0].jobskill[1].skill : null},
                                {this.state.jobs.length !== 0 ? this.state.jobs.job[0].jobskill[2].skill : null}
                            </div>
                            <div className='white-space' style={{margin:'0px 15px',fontSize:'13px'}}>Desciption : {this.state.jobs.length !== 0 ? this.state.jobs.about : null}</div>
                            <div style={{margin:'0px 15px',fontSize:'13px'}}>Salary : {this.state.jobs.length !== 0 ? this.state.jobs.job[0].salary : null}</div>
                            <a style={{float:"right",margin:'0px 15px 10px',fontSize:'15px'}} onClick={() => hendelRecommended.call(this)}>View More</a>
                        </div>
                        <div className='re1' style={{marginTop:'25px'}}>
                            <div className='r2'>New Jobs in My Job Alerts</div>
                            <div style={{borderTop:'solid 1px #ddd'}}></div>
                            <div style={{marginTop:'10px',textAlign:'center'}}>CREATE CUSTOM JOB ALERTS</div>
                            <div style={{textAlign:"center",marginBottom:'10px'}}>Stay informed about the latest jobs for you</div>
                        </div>
                        <div className='re2' style={{marginTop:'25px'}}>
                            <div className='r2'>Application Summary</div>
                            <div style={{borderTop:'solid 1px #ddd'}}></div>
                            <div style={{margin:'35px 15px 0px',fontSize:'13px'}}>Daily Limit of Application: 50</div>
                            <div style={{margin:'0px 15px 38px',fontSize:'13px'}}>Monthly Limit of Application: 150</div>    
                        </div>
                        <div className='re2' style={{marginTop:'25px',marginLeft:'4%'}}>
                            <div className='r2'>Saved Job(s)</div>
                            <div style={{borderTop:'solid 1px #ddd'}}></div>
                            <div style={{margin:'35px 15px',fontSize:'14px'}}>You have 0 saved job(s) till now.</div>
                            <div style={{float:"right",marginRight:'15px',fontSize:'14px'}}>View All</div>
                        </div>
                    </div>
                    <div style={{float:"left",width:'28.4%',marginLeft:'25px'}}>
                        <div className="profile1">
                            <img className="userprofile" src={this.state.link.length !== 0 ? this.state.link[0].profile : null} onClick={()=> hendelprofile.call(this,this.state.user.id)} />
                            <div style={{textAlign:"center"}} onClick={()=> hendelprofile.call(this,this.state.user.id)}>{this.state.user.fname}</div>
                            <div style={{textAlign:"center"}} onClick={()=> hendelprofile.call(this,this.state.user.id)}>
                                {this.state.higher.length!== 0 ? this.state.higher[0].course : null} <></>
                                {this.state.higher.length!== 0 ? this.state.higher[0].specialization : null} at <></>
                                {this.state.higher.length!== 0 ? this.state.higher[0].university_college : null}
                            </div>
                            <div style={{margin:'40px auto',width:'70%'}}><button className="homeupload" onClick={()=> hendelprofile.call(this,this.state.user.id)}>UPDATE PROFILE</button></div>
                            <div style={{marginTop:'40px',marginLeft:'5px',fontSize:'13px'}}>
                                Profile Performance
                            </div>
                            <div style={{backgroundColor:'#f5f5f5',padding:'13px 15px'}}>
                                <div style={{fontSize:'11px',color:"#4a90e2"}}>
                                    Get professional help to increase CV views. 
                                </div>
                                <div style={{fontSize:'10px'}}>Paid Service</div>
                            </div>
                        </div>
                        <div className="re1" style={{marginTop:'25px'}}>
                            <div style={{padding:'10px 15px',fontSize:'15px',fontWeight:'600'}}>Top Companies Hiring</div>
                            <div style={{borderTop:'solid 1px #ddd'}}></div>
                            <div style={{padding:'10px 15px',float:"left"}}>
                                <div className='li' style={{marginLeft:'0px'}}>
                                    <div className="white-space">Accenture</div>
                                    <div className="white-space">Hinduja Global Solutions (HGS)</div>
                                    <div className="white-space"></div>
                                    <div className="white-space"></div>
                                    <div className="white-space"></div>
                                </div>
                                <div className='li'>
                                    <div className="white-space">Aspire Systems</div>
                                    <div className="white-space">Ajuba Solutions India Pvt. Ltd.</div>
                                    <div className="white-space"></div>
                                    <div className="white-space"></div>
                                    <div className="white-space"></div>
                                </div>
                            </div>
                            <div style={{float:'right',marginRight:'15px',paddingBottom:'10px'}}>View All</div>
                        </div>
                        <div className="re1" style={{marginTop:'25px'}}>
                            <div style={{padding:'10px 15px',fontSize:'15px',fontWeight:'600'}}>FAQ</div>
                            <div style={{borderTop:'solid 1px #ddd'}}></div>
                            <div style={{fontSize:'13px',margin:'10px 0px 10px 10px'}}>
                            Click here for frequently asked questions.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout()) 
    }
}

export default withRouter(connect(null, mapDispatchToProps)(HomeView));