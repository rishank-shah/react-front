import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'
import {isAuthenticated} from '../auth/'
import {create_post} from './api'

class NewPost extends Component{
    constructor(){
        super()
        this.state = {
            title:"",
            body:"",
            photo:"",
            error:"",
            user:{},
            filesize:0,
            loading: false,
            redirect:false
        }
    }

    isValid = () =>{
        const {title,body,filesize} = this.state;
        if(filesize > 100000){
            this.setState({error:"Image should be less than 100kb"})
            return false
        }
        if(title.length === 0){
            this.setState({error:"Title is required"})
            return false
        }
        if(title.length > 50){
            this.setState({error:"Title should be less than 50 characters"})
            return false
        }
        if(body.length > 2000 ){
            this.setState({error:"Body should be less than 2000 characters"})
            return false
        }
        if(body.length === 0){
            this.setState({error:"Body is required"})
            return false
        }
        return true
    }

    componentDidMount(){
        this.postData = new FormData()
        this.setState({user:isAuthenticated().user})
    }

    handleChange = (field)=> (event) => {
        this.setState({
            error:false,
        })
        const value = field === "photo" ?event.target.files[0] : event.target.value
        const filesize = field === "photo" ?event.target.files[0].size : 0
        this.postData.set(field,value)
        this.setState({
            [field]: value,
            filesize
        })
    }

    clickSubmit = (event) =>{
        event.preventDefault();
        if(this.isValid()){
            this.setState({
                loading:true
            })
            const userId = isAuthenticated().user._id
            const token = isAuthenticated().token
            create_post(userId,token,this.postData)
            .then(data=>{
                if(data.error){
                    if(data.error.msg)
                        this.setState({error:data.error.msg,loading:false});
                    else
                        this.setState({error:data.error,loading:false});
                }
                else{
                    this.setState({
                        loading:false,
                        title:"",
                        body:"",
                        photo:"",
                        redirect:true
                    });
                }
            })
        }
        
    }

    newPostForm(title,body){
        return (
            <form>
                    <div className="form-group">
                        <label className="text-muted">Profile Pic:</label>
                        <input onChange={this.handleChange("photo")} className="form-control"
                        accept="image/*" type="file" ></input>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Title</label>
                        <input onChange={this.handleChange("title")} className="form-control" type="text" value={title}></input>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Body</label>
                        <textarea onChange={this.handleChange("body")} className="form-control" type="text" value={body}></textarea>
                    </div>
                    <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Create Post</button>
                </form>
        )
    }

    render(){
        const {title,body,redirect,user} = this.state;
        if(redirect){
            return <Redirect to={`/user/${user._id}`}/>
        }
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">
                    Create New Post
                </h2>
                    {this.state.loading?(<div className="jumbotron text-center">
                    <h2>Loading...</h2>
                    </div>):("")}
                    <div className="alert alert-danger" style={{display: this.state.error ? "":"none" }}>
                        {this.state.error}
                    </div>
                    { this.newPostForm(title,body) }
            </div>
        )
    }
}

export default NewPost