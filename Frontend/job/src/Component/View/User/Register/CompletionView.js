import React, { Component } from 'react'

export class ProfileCompletionView extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    hendeladdskill() {
        var mainDiv = document.getElementById('skillbox')
        var newDiv = document.createElement('div')
        var input1 = document.createElement('input')
        input1.className = 'skill1'
        newDiv.appendChild(input1)
        var input2 = document.createElement('input')
        input2.className = 'skill2'
        newDiv.appendChild(input2)
        var input3 = document.createElement('input')
        input3.className = 'skill2'
        newDiv.appendChild(input3)
        var input4 = document.createElement('input')
        input4.className = 'skill2'
        newDiv.appendChild(input4)
        newDiv.style.marginBottom = '10px'
        mainDiv.appendChild(newDiv)
    }
    render() {
        return (
            <div>
                <div><h3 style={{ textAlign: 'center' }}>Job Search..</h3></div>
                <div className='profilecomplet' style={{ textAlign: 'center' }}>
                    <div>All Fields are Optional</div>
                    <div>Provide additional Detail to complete your Profile</div>
                </div>
                <div className="warp">
                    <div>
                        <div style={{ marginBottom: '10px' }}>
                            <label className="left">Describe your professional background in one line</label>
                            <textarea className="middle" style={{ marginBottom: '-17px', resize: 'none' }}
                                placeholder="Jobseeker with Ph.D/Doctorate in Advertising/Mass Communiction Living in Dilhi" />
                        </div>
                        <div style={{ marginBottom: '50PX' }}>
                            <label className="left"></label>
                            <div style={{ display: 'inline-block', width: '41%', fontSize: '13px', color: '#A7A7A7' }}>
                                Example - MBA in marketing with 9 year of experience in account management, business development in FMCG industry.
                            </div>
                        </div>
                        <div style={{ marginBottom: '30px' }}>
                            <label className="left">Preferred Work Location</label>
                            <input className="middle" placeholder="Select upto 3 locations" />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label className="left">Desired Job Type</label>
                            <div className="type">
                                <input type="radio" id="parmanent" name="jobType" style={{ opacity: '0' }} />
                                <label htmlFor="parmanent" className="jobtype">Permanent</label>
                            </div>
                            <div className="type">
                                <input type="radio" id="temporary" name="jobType" style={{ opacity: '0' }} />
                                <label htmlFor="temporary" className="jobtype">Temporary/Contract</label>
                            </div>
                            <div className="type">
                                <input type="radio" id="both1" name="jobType" style={{ opacity: '0' }} />
                                <label htmlFor="both1" className="jobtype">Both</label>
                            </div>

                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label className="left">Desired Employment Type</label>
                            <div className="type">
                                <input type="radio" id="full_time" name="employmentType" style={{ opacity: '0' }} />
                                <label htmlFor="full_time" className="employmentType">Full Time</label>
                            </div>
                            <div className="type">
                                <input type="radio" id="part_time" name="employmentType" style={{ opacity: '0' }} />
                                <label htmlFor="part_time" className="employmentType">Part Time</label>
                            </div>
                            <div className="type">
                                <input type="radio" id="both2" name="employmentType" style={{ opacity: '0' }} />
                                <label htmlFor="both2" className="employmentType">Both</label>
                            </div>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label className="left" style={{ float: 'left' }}>IT Skill</label>
                            <div style={{ display: 'inline-block', width: '47%' }}>
                                <div style={{ marginBottom: '10px', color: '#A7A7A7' }}>
                                    Mention all the important programming languages and softwares Example : MS Word, Excel etc
                                    </div>
                                <div>
                                    <label style={{ width: '40%' }}>Skill</label>
                                    <label style={{ width: '20%' }}>Version</label>
                                    <label style={{ width: '20%' }}>Last Used</label>
                                    <label style={{ width: '20%' }}>Experience</label>
                                </div>
                                <div id="skillbox">
                                    <div style={{ marginBottom: '10px' }}>
                                        <input className="skill1" />
                                        <input className="skill2" />
                                        <input className="skill2" />
                                        <input className="skill2" />
                                    </div>
                                </div>
                                <div style={{ fontSize: '14px', color: '#27A7D4' }} onClick={() => this.hendeladdskill.call(this)}>+ add New Skill</div>
                            </div>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label className="left">Gender</label>
                            <input type="radio" name="gender" id="male" style={{ marginBottom: '10px', marginRight: '5px' }} />
                            <label htmlFor="male">Male</label>
                            <input type="radio" name="gender" id="female" style={{ marginBottom: '10px', marginRight: '5px', marginLeft: '10px' }} />
                            <label htmlFor="female">Female</label>
                            <input type="radio" name="gender" id="other" style={{ marginBottom: '10px', marginRight: '5px', marginLeft: '10px' }} />
                            <label htmlFor="other">Other</label>
                        </div>
                        <div>
                            <label className="left"></label>
                            <div className="submit-box" style={{ display: 'inline-block', width: '41%' }}><button>Submit</button></div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default ProfileCompletionView
