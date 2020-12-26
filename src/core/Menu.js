import React from 'react';
import {Link,withRouter} from 'react-router-dom';
import Signout from '../user/Signout'
import {isAuthenticated} from '../auth/'

const isActive = (history,path) =>{
    if (history.location.pathname === path)
        return {color:"#ffffff"}
    else   
        return {color:"#000000"}
}

const Menu = ({history}) =>(
    <div>
    <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
        <Link className="navbar-brand active" to="/" style ={isActive(history,'/')}>Home</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
                <Link className="nav-link active" to="/users" style ={isActive(history,'/users')}>All Users</Link>
            </li>

            {!isAuthenticated( ) && (
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
                        <Link className="nav-link" 
                        style ={
                        isActive(history,`/findusers`)
                        } to={`findusers`}>Find People</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" 
                        style ={
                        isActive(history,`/create-new/post`)
                        } to={`/create-new/post`}>Create Post</Link>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link btn-secondary btn-sm" style ={isActive(history,'/signout')} onClick={()=> Signout(()=>history.push('/signin'))}>SignOut</button>
                    </li>
                    </>
                )}
            </ul>
            <span className="navbar-text">
            {isAuthenticated() && (
                <Link className="nav-link" 
                style ={
                isActive(history,`/user/${isAuthenticated().user._id}`)
                } to={`/user/${isAuthenticated().user._id}`}>{`${isAuthenticated().user.name}`}</Link>
            )}
            </span>
        </div>
    </nav>
</div>
)

export default withRouter(Menu)