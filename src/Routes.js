import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ApplicantDashboard from './components/applicantDashboard';
import ApplicantLogin from './components/applicantlogin';
import Login from './components/login';
import Register from './components/register';
const Routes = props => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={ApplicantLogin} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/ApplicantDashboard" exact component={ApplicantDashboard} />

      </Switch>
    </BrowserRouter>
  )
}

export default Routes;