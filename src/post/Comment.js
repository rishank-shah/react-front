import React,{ Component } from "react";
import {postComment,postUnComment} from './api'
import {isAuthenticated} from '../auth'
import {Link} from 'react-router-dom'
import DefaultPorofileImg from '../img/user.png'

class Comment extends Component{
    state = {
        text:"",
        error:"",
    }


    deleteComment = (comment) => {
        const userId = isAuthenticated().user._id
        const postId = this.props.postId
        const token = isAuthenticated().token
    
        postUnComment(userId,postId,token,comment)
        .then(data=>{
            if(data.error){
                console.log(data.error)
            }
            else{
                this.props.updateComment(data.comments)
            }
        })
    }

    deleteConfirm  = (comment) =>{
        let ans = window.confirm("Do you want to delete this comment?")
        if(ans){
            this.deleteComment(comment)
        }
    }

    handleChange = (event) => {
        this.setState({
            text: event.target.value,
            error:""
        });
    }

    commentisValid = ()=>{
        const {text} = this.state
        if(!text.length > 0 || text.length > 100){
            this.setState({
                error: "Comment should not be empty and less than 100 characters"
            })
            return false
        }
        return true
    }

    onComment = (event)=>{
        event.preventDefault();
        if(!isAuthenticated()){
            this.setState({
                error:"Please signin"
            })
            return false
        }
        if(this.commentisValid()){
            const userId = isAuthenticated().user._id
            const postId = this.props.postId
            const token = isAuthenticated().token
            const comment = {
                text: this.state.text
            }

            postComment(userId,postId,token,comment)
            .then(data=>{
                if(data.error){
                    console.log(data.error)
                }
                else{
                    this.setState({
                        text:"",
                    })
                    this.props.updateComment(data.comments)
                }
            })
        }
    }

    render(){
        const {comments} = this.props
        return (
            <div>
                <h2 className="mt-5">Leave a comment</h2>

                <form onSubmit={this.onComment} >
                    <div className="form-group">
                        <input type = "text" onChange={this.handleChange}
                        placeholder="Leave a Comment"
                        value = {this.state.text}
                        className="form-control"/>
                    </div>
                    <button className="btn btn-raised btn-success">
                        Post
                    </button>
                </form>

                <div className="alert alert-danger" style={{display: this.state.error ? "":"none" }}>
                    {this.state.error}
                </div>
                
                <div className="col-md-12">
                    <h3> {comments.length} Comments</h3>
                    <h5>{comments.length ? '':""}</h5>
                    {comments.map((comment,i)=>(
                        <div key = {i}>
                            <div>
                                <Link to={`/user/${comment.postedBy._id}`}>
                                    <img
                                        style={{
                                            borderRadius: "50%",
                                            border: "1px solid black"
                                        }}
                                        className="float-left mr-2"
                                        height="30px"
                                        width="30px"
                                        onError={i =>
                                            (i.target.src = `${DefaultPorofileImg}`)
                                        }
                                        src={`${
                                            process.env.REACT_APP_API_URL
                                        }/user/photo/${comment.postedBy._id}`}
                                        alt={comment.postedBy.name}
                                    />
                                </Link>
                                    <div>
                                        <p className="lead">
                                            {comment.text}
                                        </p>
                                        <p className="mark font-italic">Posted By <Link to={`/user/${comment.postedBy._id}`}>{comment.postedBy.name}</Link> on {new Date(comment.created).toDateString()}
                                        
                                        <span>
                                            {isAuthenticated().user && isAuthenticated().user._id === comment.postedBy._id && (
                                                <span onClick={()=>this.deleteConfirm(comment)} className="text-danger float-right mr-2">Delete Comment</span>
                                            )}
                                        </span>

                                        </p>
                                    </div>
                                </div>
                            </div>
                    ))}
                    </div>
                    
            </div>
        )
    }
}

export default Comment;