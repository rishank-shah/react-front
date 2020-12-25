import React,{Component} from 'react'
import {single_post,remove_post,postUnLike,postLike} from './api'
import {Link, Redirect} from 'react-router-dom'
import DefaultPost from '../img/post.png'
import {isAuthenticated} from '../auth'
import Comment from './Comment'

class SinglePost extends Component{
    state = {
        post: '',
        message:false,
        like:false,
        likes:0,
        error:'',
        redirect:false,
        comments: []
    }

    postLikeButton = () =>{
        if(!isAuthenticated()){
            this.setState({redirect:true})
            return false
        }
        let call = this.state.like ? postUnLike : postLike
        const userId = isAuthenticated().user._id
        const postId = this.state.post._id
        const token = isAuthenticated().token
        call(userId,postId,token)
        .then(data=>{
            if(data.error){
                this.setState({
                    error:data.error
                })
            }
            else{
                this.setState({
                    like: !this.state.like,
                    likes:data.likes.length
                })
            }
        })
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
                this.setState({post:data,likes:data.likes.length,
                like: this.checkLike(data.likes),
                comments:data.comments
            })
            }
        })
    }


    checkLike(likes){
        const userId = isAuthenticated() &&  isAuthenticated().user._id
        let match = likes.indexOf(userId) !== -1
        return match
    }

    updateComment = (comments) =>{
        this.setState({
            comments:comments
        })
    }

    renderpost(post){
        const {likes,like} = this.state
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

                    {like ? (
                        <h3 onClick={this.postLikeButton} className="text-success">
                            {likes} likes
                        </h3>
                    ) : (
                        <h3 onClick={this.postLikeButton} className="text-danger">
                            {likes} likes
                        </h3>
                    )}


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
        const {post,message,redirect} = this.state
        if(message){
            return <Redirect to={`/`}/>
        }
        if(redirect){
            return <Redirect to={`/signin`}/>
        }
        return (
            <div className="container mt-5 ml-5">

                {!post?(
                <>
                    <div className="jumbotron text-center">
                        <h2>Loading...</h2>
                    </div>
                    <div className="alert alert-danger" style={{display: this.state.error ? "":"none" }}>
                    {this.state.error}
                    </div>
                </>
                ):(
                <>
                    <div className="text-center">
                        <h2>{post.title}</h2>
                    </div>
                    <div className="row">
                        {this.renderpost(post)}
                    </div>
                </>
                )}

                <Comment postId={post._id} comments={this.state.comments} updateComment={this.updateComment} />
            </div>
        )
    }
}

export default SinglePost
