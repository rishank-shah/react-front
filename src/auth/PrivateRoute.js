import React from 'react'
import {Route,Redirect} from 'react-router-dom'
import {isAuthenticated} from './index'


//                                          rest of args
const PrivateRoute = ({component:Component,...rest}) => (
    //rest of props 
    //props is components passed to privateroute component
    <Route {...rest} render={props=> isAuthenticated() ? (
        <Component {...props} />
    ): (
        <Redirect to = {{pathname:"/signin",state:{from:props.location}}} />
    )} />
)

export default PrivateRoute