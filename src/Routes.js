import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ApplicantDashboard from './components/Applicant/applicantDashboard';
import ApplicantLogin from './components/Applicant/applicantlogin';
import ApplicantProfile from './components/Applicant/ApplicantProfile';
import ApplyJob from './components/Applicant/ApplyJob';
import Register from './components/Applicant/register';
import SearchJob from './components/Applicant/SearchJobs';
import ViewApplications from './components/Applicant/ViewApplications';
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
        <Route path="/ViewApplications" exact component={ViewApplications} />
        <Route path="/JobDetails/:id" exact component={ApplyJob} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;