import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './Home';
import CompaniesList from './CompaniesList';
import CompanyWithJobs from './CompanyWithJobs';
import JobsList from './JobsList';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import ProfileForm from './ProfileForm';
import NotFound from './NotFound';

function Routes( {signup, login} ) {
    return(
        <Switch>
            <Route exact path='/companies/:handle'>
                <CompanyWithJobs/>
            </Route>
            <Route exact path='/companies'>
                <CompaniesList />
            </Route>
            <Route exact path='/jobs'>
                <JobsList />
            </Route>
            <Route exact path='/login'>
                <LoginForm login={login}/>
            </Route>
            <Route exact path='/signup'>
                <SignupForm signup={signup}/>
            </Route>
            <Route exact path='/profile'>
                <ProfileForm />
            </Route>
            <Route exact path='/'>
                <Home />
            </Route>
            <Route>
                <NotFound />
            </Route>
        </Switch>
    )
}

export default Routes;