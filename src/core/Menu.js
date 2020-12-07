import React from 'react';
import {Link,withRouter} from 'react-router-dom';
import Signout from '../user/Signout'
import {isAuthenticated} from '../auth/'

const isActive = (history,path) =>{
    if (history.location.pathname === path)
        return {color:"#000000"}
    else   
        return {color:"#ffffff"}
}

//props.history
const Menu = ({history}) =>(
    <div>
        <ul className="nav nav-tabs bg-secondary text-white">
            <li className="nav-item">
                <Link className="nav-link active" to="/" style ={isActive(history,'/')}>Home</Link>
            </li>

            <li className="nav-item">
                <Link className="nav-link active" to="/users" style ={isActive(history,'/users')}>All Users</Link>
            </li>

            {!isAuthenticated( ) && (
                //react fragements
                <>
                    <li className="nav-item">
                    <Link className="nav-link" to="/signin" style ={isActive(history,'/signin')}>SignIn</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/signup" style ={isActive(history,'/signup')}>SignUp</Link>
                </li>
                </>
            )}
            
            {isAuthenticated() && (
                <>
                <li className="nav-item">
                    <button className="nav-link btn-secondary" style ={isActive(history,'/signout')} onClick={()=> Signout(()=>history.push('/signin'))}>SignOut</button>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" 
                    style ={
                       isActive(history,`/user/${isAuthenticated().user._id}`)
                    } to={`/user/${isAuthenticated().user._id}`}>{`${isAuthenticated().user.name}'s profile`}</Link>
                </li>
                </>
            )}
        </ul>
    </div>
)

export default withRouter(Menu)