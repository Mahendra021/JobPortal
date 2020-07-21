import React, { Component } from 'react'

export class JobFilter extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    render() {
        return (
            <div>
                <div className="Filtermain">
                    <img className="filter" src="images/filter.png" />
                </div>
                <div className="Filterdiv">
                    <div className="filterlist">Experience
                            <div className="experiencelist" style={{ marginTop: "4px", borderTop: " 1px solid black" }} onClick={() => this.hendelexperience.call(this, '1')}>1</div>
                        <div className="experiencelist" onClick={() => this.hendelexperience.call(this, '2')}>2</div>
                        <div className="experiencelist" onClick={() => this.hendelexperience.call(this, '3')}>3</div>
                        <div className="experiencelist" onClick={() => this.hendelexperience.call(this, '4')}>4</div>
                        <div className="experiencelist" style={{ borderBottom: 'none' }} onClick={() => this.hendelexperience.call(this, '5')}>5</div>
                    </div>
                    <div className="filterlist">Salary
                            <div className="salarylist" style={{ marginTop: "4px", borderTop: " 1px solid black" }} onClick={() => this.hendelsalary.call(this, '10000')}>10000</div>
                        <div className="salarylist" onClick={() => this.hendelsalary.call(this, '15000')}>15000</div>
                        <div className="salarylist" onClick={() => this.hendelsalary.call(this, '20000')}>20000</div>
                        <div className="salarylist" onClick={() => this.hendelsalary.call(this, '25000')}>25000</div>
                        <div className="salarylist" onClick={() => this.hendelsalary.call(this, '30000')}>30000</div>
                        <div className="salarylist" onClick={() => this.hendelsalary.call(this, '35000')}>35000</div>
                        <div className="salarylist" onClick={() => this.hendelsalary.call(this, '40000')}>40000</div>
                        <div className="salarylist" style={{ borderBottom: 'none' }} onClick={() => this.hendelsalary.call(this, '50000')}>50000</div>
                    </div>
                    <div className="filterlist">Job Type</div>
                    <div className="filterlist">Fresher</div>
                    <div className="filterlist">Industy</div>
                    <div className="filterlist">Qualifications</div>
                    <div className="filterlist">Role</div>
                    <div className="filterlist" style={{ borderBottom: '0px' }}>Staff</div>
                </div>
            </div>
        )
    }
}

export default JobFilter
