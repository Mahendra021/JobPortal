import React, { Component } from 'react'
import { higher_education,education,updateaddress,uploadsource,updateuser } from '../../../Model/UserUploadData'
import { ownerdata,userdata,useraddress } from '../../../Model/UserData'
import { Redirect } from 'react-router-dom' 
import Select from "react-dropdown-select";
import './Assets/register.css'
import {createBrowserHistory} from 'history';

var history = createBrowserHistory()

const options1 = [
    {value:'Doctorate/Ph.D',label:'Doctorate/Ph.D'},
    {value:'Masters/Post-Graduation',label:'Masters/Post-Graduation'},
    {value:'Graduation/Diploma',label:'Graduation/Diploma'},
    {value:'12th',label:'12th'},
    {value:'10th',label:'10th'},
    {value:'Below 10th',label:'Below 10th'}
]


export class EducationView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            qualification: '', course: '', specialization: '',
            college: '', course_type: 'Full Time', passing_year: '',
            board: '', yerar_of_passing: '', medium: '',
            percentage: '', skill: [], file: null,
            labelField: "label",valueField: "value",
        }
    }

    async heandeeducation() {
        
        var token = localStorage.getItem('token')
        var owner = await ownerdata(token)
        var pk = owner.id

        var jsonObject1 = {
            qualification: this.state.qualification,
            course: this.state.course,
            specialization: this.state.specialization,
            university_college: this.state.college,
            course_type: this.state.course_type,
            passing_year: this.state.passing_year,
            skill: this.state.skill,
            owner:pk
        }

        var jsonObject2 = {
            qualification: this.state.qualification,
            Board: this.state.board,
            yerar_of_passing: this.state.yerar_of_passing,
            medium: this.state.medium,
            percentage: this.state.percentage,
            owner:pk
        }

        await higher_education(jsonObject1)
        if (this.state.qualification === 'Graduation/Diploma' || this.state.qualification === 'Doctorate/Ph.D' || this.state.qualification === 'Masters/Post-Graduation') {
           await higher_education(jsonObject1)
        }
        else {
            await education(jsonObject2)
        }

        console.log(this.state);

        if(this.state.qualification === ''){
            document.getElementById("quali_err").innerHTML="Plass Enter your Qualifiction"
        }
        if(this.state.course === ''){
            document.getElementById("course_err").innerHTML="Plass Enter your Course"
        }
        if(this.state.specialization === ''){
            document.getElementById("speci_err").innerHTML="Plass Enate your Specializtion"
        }
        if(this.state.college === ''){
            document.getElementById("univers_err").innerHTML="Plass Enate University you are graduation from"
        }
        if(this.state.passing_year === ''){
            document.getElementById("year_err").innerHTML="Plass Enate graduation yare"
        }
        if(this.state.file === null){
            document.getElementById("resume_err").innerHTML="Plass Upload a Resume"
        }

        if(this.state.qualification !== '' && this.state.course !== '' && this.state.specialization !== '' && this.state.college !== '' && this.state.passing_year !== '' && this.state.file !== null){
            history.push("/user")
            window.location.reload()
        }

    }

    render() {

        if (this.props.isAuthenticated===false) {
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
                            <div className="middle" style={{height:"45px"}}>
                                <Select placeholder="Select Education" labelField={this.state.labelField} valueField={this.state.valueField} options={options1} onChange={(e) => { this.setState({ qualification: e[0].value }) }} />
                                <br/>
                                <span id="quali_err" className="err"></span>
                            </div>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label className="left mandatory">Course</label>
                            <div className="middle">
                                <input className="middelinput" placeholder="Select Course" onChange={(e) => { this.setState({ course: e.target.value }) }} />
                                <br/>
                                <span id="course_err" className="err"></span>
                            </div>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label className=" left mandatory">Specialization</label>
                            <div className="middle">
                                <input className="middelinput" placeholder="Select Specialization" onChange={(e) => { this.setState({ specialization: e.target.value }) }} />
                                <br/>
                                <span id="speci_err" className="err"></span>
                            </div>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label className="left mandatory">University/College</label>
                            <div className="middle">
                                <input className="middelinput" placeholder="Institute Name" onChange={(e) => { this.setState({ college: e.target.value }) }} />
                                <br/>
                                <span id="univers_err" className="err"></span>
                            </div>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label className="left mandatory">Course Type</label>
                            <div className="middle" style={{height:"40px"}}>
                                <div  className="middelinput" style={{border : 'none'}}>
                                    <input type="radio" id='full_time' name="coutesType" value='Full Time' defaultChecked style={{ marginBottom: '10px', marginRight: '5px' }} onClick={(e) => { this.setState({ course_type: e.target.value }) }} />
                                    <label htmlFor="full_time">Full Time</label>
                                    <input type="radio" id='part_time' name="coutesType" value='Part Time' style={{ marginBottom: '10px', marginRight: '5px', marginLeft: '10px' }} onClick={(e) => { this.setState({ course_type: e.target.value }) }} />
                                    <label htmlFor='part_time'>Part Time</label>
                                    <input type="radio" id='correspondene' name="coutesType" value='Correspondence' style={{ marginBottom: '10px', marginRight: '5px', marginLeft: '10px' }} onClick={(e) => { this.setState({ course_type: e.target.value }) }} />
                                    <label htmlFor='correspondene'>Correspondence</label>
                                </div>
                            </div>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label className="left mandatory">Passing Year</label>
                            <div className="middle">
                                <input className="middelinput" placeholder="Select Pass out Year" onChange={(e) => { this.setState({ passing_year: e.target.value }) }} />
                                <br/>
                                <span id="year_err" className="err"></span>
                            </div>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label className="left">Skill</label>
                            <div className="middle">
                                <input className="middelinput" placeholder="Select Skill" onChange={(e) => { this.setState({ skill: e.target.value }) }} />
                            </div>
                        </div>
                        <div>
                            <label className="left"></label>
                            <div>
                            <div className="submit-box" style={{ display: 'inline-block', width: '41%' }}><button onClick={() => this.heandeeducation()}>Continue</button></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default EducationView