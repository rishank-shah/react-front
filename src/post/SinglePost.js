import React,{Component} from 'react'
import {single_post,remove_post} from './api'
import {Link, Redirect} from 'react-router-dom'
import DefaultPost from '../img/post.png'
import {isAuthenticated} from '../auth'

class SinglePost extends Component{
    state = {
        post: '',
        message:false
    }

    deletepost = () => {
        const postId = this.state.post._id
        remove_post(postId,isAuthenticated().token)
        .then(data=>{
            if(data.error){
                console.log(data.error)
            }
            else{
                this.setState({message:true})
            }
        })
    }

    deleteConfirm  = () =>{
        let ans = window.confirm("Do you want to delete this post?")
        if(ans){
            this.deletepost()
        }
    }

    componentDidMount(){
        const postId = this.props.match.params.postId
        single_post(postId)
        .then(data=>{
            if(data.error){
                console.log(data.error)
            }
            else{
                this.setState({post:data})
            }
        })
    }

    renderpost(post){
        const postedId = post.postedBy ?`/user/${post.postedBy._id}` : ""
        const postedName = post.postedBy ? post.postedBy.name : "Unknown"
        return (
            <div className="col-md-12 mt-3 ml-4 " style={{width: "18rem"}}>
                <div className="card-body text-center">

                    <img src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                    onError={
                        i=>i.target.src = `${DefaultPost}`
                    }
                    className="img-thumbnail mb-2 mt-2"
                    style ={{height:"250px",width:"auto"}}
                    alt={postedName}/>

                    <p className="card-text">
                        {post.body}
                    </p>
                    <br/>
                    <p className="mark font-italic">Posted By <Link to={postedId}>{postedName}</Link> on {new Date(post.created).toDateString()}</p>

                    <div className="d-inline-block">
                        <Link to={`/`} className="btn btn-raised btn-sm btn-primary mr-5">Back</Link>
                        {isAuthenticated().user && isAuthenticated().user._id === post.postedBy._id && (
                            <>
                            <Link to={`/post/edit/${post._id}`} className="btn btn-raised btn-sm btn-secondary mr-5">Update Post</Link>

                            <button onClick={this.deleteConfirm} className="btn btn-raised btn-sm btn-warning">Delete Post</button>
                            </>
                        )}
                    </div>

                </div>
            </div>
        )
    }

    render(){
        const {post,message} = this.state
        if(message){
            return <Redirect to={`/`}/>
        }
        return (
            <div className="container mt-5 ml-5">

                {!post?(<div className="jumbotron text-center">
                    <h2>Loading...</h2>
                </div>):(
                <>
                    <div className="text-center">
                        <h2>{post.title}</h2>
                    </div>
                    <div className="row">
                        {this.renderpost(post)}
                    </div>
                </>
                )}

            </div>
        )
    }
}

export default SinglePost
