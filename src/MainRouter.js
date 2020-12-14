import React from 'react';
import {Route,Switch} from 'react-router-dom';
import Home from './core/Home';
import Signup from './user/Signup'
import Signin from './user/Signin'
import Menu from './core/Menu'
import Profile from './user/Profile'
import Allusers from './user/Alluser'
import EditProfile from './user/EditProfile'
import PrivateRoute from './auth/PrivateRoute'
import FindUser from './user/FindUser'
import NewPost from './post/NewPost'

const MainRouter = ()=>(
    <div>
        <Menu/>
        {/* switches between different components */}
        <Switch>
            {/* exact is used so that url will match exactly otherwise all urls will go to / */}
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/signup" component={Signup}></Route>
            <Route exact path="/signin" component={Signin}></Route>
            <PrivateRoute exact path="/user/:userId" component={Profile}/>
            <Route exact path="/users" component={Allusers}></Route>
            <PrivateRoute exact path="/user/edit/:userId" component={EditProfile}/>
            <PrivateRoute exact path="/findusers" component={FindUser}/>

            <PrivateRoute exact path="/create-new/post" component={NewPost}/>
        </Switch>
    </div>
);

export default MainRouter;