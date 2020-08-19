import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { userdata, useraddress, usersource, higher_education, ownerdata } from '../../../Model/UserData';
import { JobIdData } from '../../../Model/JobData';
import '../Profile/Assets/profile.css'

export class ProfileView extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             user:[],
             address:[],jobs:[],
             link:[],higher:[]
        }
    }

    async componentDidMount(){

        var token = localStorage.getItem('token')
        var owner = await ownerdata(token)
        var pk = owner.pk
        var user = await userdata(pk,token)
        var address = await useraddress()
        var link = await usersource()
        var higher = await higher_education()
        var jobs = await JobIdData(1)
        this.setState({
            user: user[0],
            address:address,
            link:link,
            higher:higher,
            jobs:jobs
        });
        console.log(this.state);
    }

    hendelQuickLink(id){

        var link = document.getElementById(id)
        link.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest"
          });
    }

    render() {
        // if (this.props.isAuthenticated===false) {
        //     return <Redirect to="/user" />;
        // }
        return (
            <div>
                <ul>
                    <li className="listCompany">Name</li>
                    <li key="2" id="logout" onClick={this.props.logout}>
                        <div>Logout</div>
                    </li>
                </ul>
                <div className="waper">
                    <div className="mainDetail4">
                        <img className="userprofile" src={this.state.link.length !== 0 ? this.state.link[0].profile : null}></img>
                        <div style={{float:"left",marginLeft:"15px"}}>
                            <div style={{height:"60px"}}>{this.state.user.fname}</div>
                            <div>
                                <div style={{float:"left",width:"250px"}}>
                                    location : {this.state.address.length !==0 ? this.state.address[0].city : null},
                                    {this.state.address.length !==0 ? this.state.address[0].country : null}
                                </div>
                                <div style={{float:"left"}}>
                                    Phone : {this.state.user.mobile}
                                </div>
                                <br/>
                                <div style={{float:"left",width:"250px"}}>
                                    Experians : {this.state.user.experians === 0 ? 'Fresher' : this.state.user.experians+" Yaer"}
                                </div>
                                <div style={{float:"left"}}>
                                    Mail : {this.state.user.email}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{float:"left",width:"100%",marginTop:'20px'}}>
                        <div className="subdiv">
                            <div className="quick">
                                Quick Links
                                <div style={{borderTop:'solid 1px #ddd',marginTop:'5px'}}></div>
                            </div>
                            <div className="quicklink" onClick={()=> this.hendelQuickLink('resume')}>
                                <span className="linkmain">Attach Resume</span>
                                <span className="linksub">UPLOAD</span>
                            </div>
                            <div className="quicklink" onClick={()=> this.hendelQuickLink('headline')}>
                                <span className="linkmain">Resume Headline</span>
                            </div>
                            <div className="quicklink" onClick={()=> this.hendelQuickLink('skill')}>
                                <span className="linkmain">Key Skills</span>
                            </div>
                            <div className="quicklink" onClick={()=> this.hendelQuickLink('employ')}>
                                <span className="linkmain">Employment</span>
                                <span className="linksub">ADD</span>
                            </div>
                            <div className="quicklink" onClick={()=> this.hendelQuickLink('education')}>
                                <span className="linkmain">Education</span>
                                <span className="linksub">ADD</span>
                            </div>
                            <div className="quicklink" onClick={()=> this.hendelQuickLink('project')}>
                                <span className="linkmain">Projects</span>
                                <span className="linksub">ADD</span>
                            </div>
                            <div className="quicklink" onClick={()=> this.hendelQuickLink('summary')}>
                                <span className="linkmain">Profile Summary</span>
                                <span className="linksub">ADD</span>
                            </div>
                            <div className="quicklink" onClick={()=> this.hendelQuickLink('accomplis')}>
                                <span className="linkmain">Accomplishments</span>
                            </div>
                            <div className="quicklink" onClick={()=> this.hendelQuickLink('career')}>
                                <span className="linkmain">Desired Career Profile</span>
                            </div>
                            <div className="quicklink" onClick={()=> this.hendelQuickLink('details')}>
                                <span className="linkmain">Personal Details</span>
                            </div>
                        </div>
                        <div className="subdiv1">
                            <div className="subdiv2" id="resume" style={{marginTop:'0px'}}>
                                <div className="title">
                                    Attach Resume
                                    <samp>Add 10%</samp>
                                </div>
                                <div style={{marginBottom:"15px",fontSize:'14px'}}>Resume is the most important document recruiters look for.
                                    Recruiters generally do not look at profiles without resumes.
                                </div>
                                <div className="resume">
                                    <button className="CVupload">Upload Resume</button>
                                    <input type='file' name="Upload Resume" />
                                    <div>Supported Formats: doc, docx, rtf, pdf, upto 2 MB</div>
                                </div>
                                <div style={{textAlign:"center"}}>
                                    <div className="separator">
                                        <samp></samp>
                                        Or
                                        <samp></samp>
                                    </div>
                                    <div style={{fontSize:"13px"}}>If you do not have a resume document, you may write your brief professional profile here</div>
                                </div>
                            </div>
                            <div className="subdiv2" id='headline'>
                                <div className="title">
                                    Resume Headline
                                    <samp>Edit</samp>    
                                </div>
                                <div style={{fontSize:"14px",margin:"10px 0px"}}>
                                    Jobseeker with {this.state.higher.length!== 0 ? this.state.higher[0].course : null} in <></>   
                                    {this.state.higher.length!== 0 ? this.state.higher[0].specialization : null} currently living 
                                    in {this.state.address.length !==0 ? this.state.address[0].city : null}
                                </div>
                            </div>
                            <div className="subdiv2" id='skill'>
                                <div className="title">
                                    Key Skills
                                    <samp>Edit</samp>
                                </div>
                                <div style={{marginTop:'20px',marginBottom:'15px'}}>
                                    <div className="skill">{this.state.jobs.length !== 0 ? this.state.jobs.job[0].jobskill[0].skill : null}</div>
                                    <div className="skill">{this.state.jobs.length !== 0 ? this.state.jobs.job[0].jobskill[1].skill : null}</div>
                                    <div className="skill">{this.state.jobs.length !== 0 ? this.state.jobs.job[0].jobskill[2].skill : null}</div>
                                </div>
                            </div>
                            <div className="subdiv2" id='employ'>
                                <div className="title">
                                    Employment
                                    <samp style={{float:"right"}}>
                                        ADD EMPLOYMENT
                                    </samp>
                                </div>
                            </div>
                            <div className="subdiv2" id='education'>
                                <div className="title">
                                    Education
                                    <samp style={{float:"right"}}>
                                        ADD EDUCATION
                                    </samp>
                                </div>
                            </div>
                            <div className="subdiv2" id='project'>
                                <div className="title">
                                    Projects
                                    <samp>Add 8%</samp>
                                    <samp style={{float:"right"}}>ADD PROJECTS</samp>
                                </div>
                            </div>
                            <div className="subdiv2" id='summary'>
                                <div className="title">
                                    Profile Summary
                                    <samp style={{float:"right"}}>ADD PROFILE SUMMARY</samp>
                                </div>
                            </div>
                            <div className="subdiv2" id='accomplis'>
                                <div className="title">
                                    Accomplishments
                                </div>
                            </div>
                            <div className="subdiv2" id='career'>
                                <div className="title">
                                    Desired Career Profile
                                    <samp>
                                        Edit
                                    </samp>
                                </div>
                            </div>
                            <div className="subdiv2" id='details'>
                                <div className="title">
                                    Personal Details
                                    <samp>
                                        Edit
                                    </samp>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfileView
