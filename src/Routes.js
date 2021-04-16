import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ApplicantDashboard from './components/Applicant/applicantDashboard';
import ApplicantLogin from './components/Applicant/applicantlogin';
import ApplicantProfile from './components/Applicant/ApplicantProfile';
import Register from './components/Applicant/register';
import SearchJob from './components/Applicant/SearchJobs';
import Login from './components/login';
const Routes = props => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={ApplicantLogin} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/ApplicantDashboard" exact component={ApplicantDashboard} />
        <Route path="/ApplicantProfile/:page" exact component={ApplicantProfile} />
        <Route path="/SearchJob" exact component={SearchJob} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;