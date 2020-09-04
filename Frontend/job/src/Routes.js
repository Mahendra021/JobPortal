import React, { Component } from 'react'
import MapPage from './Component/Controller/MapPage/MapPage'
import JobDetail from './Component/Controller/JobDetail/JobDetail'
import Register from './Component/Controller/User/Register/Register'
import Education from './Component/Controller/User/Register/Education'
import ProfileCompletion from './Component/Controller/User/Register/Copmletion'
import CompanyRegister from './Component/Controller/Recruiter/Register/Register'
import Post from './Component/Controller/Recruiter/Register/Post'
import { createBrowserHistory } from 'history';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Component/Controller/User/Login/Login'
import RecruitLogin from './Component/Controller/Recruiter/Login/Login';
import * as actions from './store/actions/auth'
import { connect } from 'react-redux'
import Profile from './Component/Controller/Recruiter/Profile/Profile'
import JobSeeker from './Component/Controller/User/Profile/Profile'
import Home from './Component/Controller/Home/Home'
import UserHome from './Component/Controller/Home/UserHome'
var history = createBrowserHistory();

export class Routers extends Component {

    componentDidMount() {
        this.props.onTryAutoSignup();
      }
    
    render() {
        return (
            <Router history={history}>
                <div>
                    <Switch>
                        <Route exact path='/'                                       component={() => <Home              {...this.props}/>} />
                        <Route exact path='/user'                                   component={() => <UserHome          {...this.props}/>} />
                        <Route exact path='/map'                                    component={() => <MapPage           {...this.props} />} />
                        <Route exact path='/recommended'                            component={() => <MapPage           {...this.props} />} />
                        <Route exact path='/jobseeker'                              component={() => <MapPage           {...this.props} />} />
                        <Route exact path='/account/register/basicdetail'           component={() => <Register          {...this.props} />} />
                        <Route exact path='/account/register/education'             component={() => <Education         {...this.props} />} />
                        <Route exact path='/account/register/profile'               component={() => <ProfileCompletion {...this.props} />} />
                        <Route exact path='/login'                                  component={() => <Login             {...this.props}/>} />
                        <Route exact path='/company/register'                       component={() => <CompanyRegister   {...this.props} />} />
                        <Route exact path='/recruit/login'                          component={() => <RecruitLogin      {...this.props} />} />
                        <Route exact path='/jobpost'                                component={() => <Post              {...this.props} />} />
                        <Route exact path='/company'                                component={() => <Profile           {...this.props} />} />
                        <Route exact path='/JobDetail'                              component={() => <JobDetail         {...this.props} />} />
                        <Route exact path='/company/profile'                        component={() => <Profile           {...this.props} />} />
                        <Route exact path='/PostDetail'                             component={() => <JobDetail         {...this.props} />} />
                        <Route exact path='/jobseeker/profile'                      component={() => <JobSeeker         {...this.props} />}/>
                    </Switch>
                </div>
            </Router>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Routers)