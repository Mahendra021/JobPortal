import React, { Component } from 'react'
import { education } from '../../../Model/UserUploadData'
import { userdata } from '../../../Model/UserData'
import { Redirect } from 'react-router-dom' 
import './Assets/register.css'
import {createBrowserHistory} from 'history';

var history = createBrowserHistory()

export class EducationView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            qualification: '', course: '', specialization: '',
            college: '', course_type: '', passing_year: '',
            board: '', yerar_of_passing: '', medium: '',
            percentage: '', skill: []
        }
    }

    async heandeeducation() {
        var user = await userdata()
        var id = 2
        var jsonObject1 = {
            qualification: this.state.qualification,
            course: this.state.course,
            specialization: this.state.specialization,
            university_college: this.state.college,
            course_type: this.state.course_type,
            passing_year: this.state.passing_year,
            skill: this.state.skill,
            user_id: id
        }
        var jsonObject2 = {
            qualification: this.state.qualification,
            Board: this.state.board,
            yerar_of_passing: this.state.yerar_of_passing,
            medium: this.state.medium,
            percentage: this.state.percentage,
            user_id: id
        }
        if (this.state.qualification === ('Doctorate/Ph.D' || 'Masters/Post-Graduation' || 'Graduation/Diploma')) {
            await education(jsonObject1)
        }
        else {
            await education(jsonObject2)
        }

        console.log(this.state);

        history.push("/")
        window.location.reload()

    }

    render() {

        if (this.props.isAuthenticated) {
            return <Redirect to="/account/register/basicdetail" />;
        }
        return (
            <div>
                <div><h3 style={{ textAlign: 'center' }}>Job Search..</h3></div>
                <div className='banner' style={{ textAlign: 'center' }}>
                    <div style={{ display: 'inline-block' }}>Personal<em></em></div>
                    <div style={{ display: 'inline-block' }}>Education<em></em></div>
                </div>
                <div className="warp">
                    <div>
                        <div style={{ marginBottom: '10px' }}>
                            <label className="left mandatory">Highest Qualification</label>
                            <input className="middle" placeholder="Select Education" onChange={(e) => { this.setState({ qualification: e.target.value }) }} />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label className="left mandatory">Course</label>
                            <input className="middle" placeholder="Select Course" onChange={(e) => { this.setState({ course: e.target.value }) }} />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label className=" left mandatory">Specialization</label>
                            <input className="middle" placeholder="Select Specialization" onChange={(e) => { this.setState({ specialization: e.target.value }) }} />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label className="left mandatory">University/College</label>
                            <input className="middle" placeholder="Institute Name" onChange={(e) => { this.setState({ college: e.target.value }) }} />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label className="left mandatory">Course Type</label>
                            <input type="radio" id='full_time' name="coutesType" value='Full Time' style={{ marginBottom: '10px', marginRight: '5px' }} onClick={(e) => { this.setState({ course_type: e.target.value }) }} />
                            <label htmlFor="full_time">Full Time</label>
                            <input type="radio" id='part_time' name="coutesType" value='Part Time' style={{ marginBottom: '10px', marginRight: '5px', marginLeft: '10px' }} onClick={(e) => { this.setState({ course_type: e.target.value }) }} />
                            <label htmlFor='part_time'>Part Time</label>
                            <input type="radio" id='correspondene' name="coutesType" value='Correspondence' style={{ marginBottom: '10px', marginRight: '5px', marginLeft: '10px' }} onClick={(e) => { this.setState({ course_type: e.target.value }) }} />
                            <label htmlFor='correspondene'>Correspondence</label>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label className="left mandatory">Passing Year</label>
                            <input className="middle" placeholder="Select Pass out Year" onChange={(e) => { this.setState({ passing_year: e.target.value }) }} />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label className="left mandatory">Skill</label>
                            <input className="middle" placeholder="Select Skill" onChange={(e) => { this.setState({ skill: e.target.value }) }} />
                        </div>
                        <div>
                            <label className="left"></label>
                            <div className="submit-box" style={{ display: 'inline-block', width: '41%' }}><button onClick={() => this.heandeeducation()}>Continue</button></div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default EducationView