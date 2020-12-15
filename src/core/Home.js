import React from 'react';
import Post from '../post/Post'

const Home = () =>(
    <div>
        <div className="jumbotron">
            <h2>Home</h2>
            <p className="lead">Welcome to Home page</p>
        </div>


        <div className="container">
            <Post/>
        </div>

    </div>

);

export default Home;