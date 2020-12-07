import React from 'react';
import {Route,Switch} from 'react-router-dom';
import Home from './core/Home';
import Signup from './user/Signup'
import Signin from './user/Signin'
import Menu from './core/Menu'
import Profile from './user/Profile'
import Allusers from './user/Alluser'

const MainRouter = ()=>(
    <div>
        <Menu/>
        {/* switches between different components */}
        <Switch>
            {/* exact is used so that url will match exactly otherwise all urls will go to / */}
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/signup" component={Signup}></Route>
            <Route exact path="/signin" component={Signin}></Route>
            <Route exact path="/user/:userId" component={Profile}></Route>
            <Route exact path="/users" component={Allusers}></Route>
        </Switch>
    </div>
);

export default MainRouter;