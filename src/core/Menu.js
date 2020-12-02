import React from 'react';
import {Link} from 'react-router-dom';

const Menu = () =>(
    <div>
        <ul className="nav nav-tabs">
            <li className="nav-item">
                <Link className="nav-link active" to="/">Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/signin">SignIn</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/signup">SignUp</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/">SignOut</Link>
            </li>
        </ul>
    </div>
)



export default Menu