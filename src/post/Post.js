import React, {Component} from 'react'
import {list_post} from './api'
import {Link} from 'react-router-dom'
import DefaultPost from '../img/post.png'

class Post extends Component{
    constructor(){
        super();
        this.state = {
            posts:[]
        }
    }
    componentDidMount(){
        list_post()
        .then(data=>{
            if(data.error){
                console.log(data.error)
            }
            else{
                this.setState({
                    posts: data.posts
                })
            }
        })
    }
    renderPost = posts =>{
        
        return (
            <div className="row">
                {posts.map((post,i)=>{
                    const postedId = post.postedBy ?`/user/${post.postedBy._id}` : ""
                    const postedName = post.postedBy ? post.postedBy.name : "Unknown"
                    return (
                        <div className="card col-md-5 mt-3 ml-4 " style={{width: "18rem"}} key={i}>
                            <div className="card-body text-center">

                                <img src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`} 
                                onError={
                                    i=>i.target.src = `${DefaultPost}`
                                }
                                className="img-thumbnail mb-2 mt-2"
                                style ={{height:"250px",width:"auto"}}
                                alt={postedName}/>

                                <h5 className="card-title">{post.title}</h5>
                                <p className="card-text">{post.body.substring(0,100)}.....</p>
                                <br/>
                                <p className="mark font-italic">Posted By <Link to={postedId}>{postedName}</Link> on {new Date(post.created).toDateString()}</p>
                                <Link to={`/post/${post._id}`} className="btn btn-raised btn-sm btn-primary">View Post</Link>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

    render(){
        const {posts} = this.state
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">
                    {posts.length? 'Recent Posts':'Loading...'}
                </h2>
                {this.renderPost(posts)}
            </div>
        )
    }
}

export default Post