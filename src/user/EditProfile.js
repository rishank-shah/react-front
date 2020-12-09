import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'
import {isAuthenticated} from '../auth/'
import {read_user_info,update} from './userApi'

class EditProfile extends Component{
    constructor(){
        super()
        this.state = {
            id: "",
            name: "",
            email:"",
            password: "",
            redirect:false,
            error:"",
            loading:false,
            filesize:0
        }
    }

    init = (userId) => {
        const token = isAuthenticated().token
        read_user_info(userId,token)
        .then(data=>{
            if(data.error){
                if(data.error.msg)
                    this.setState({error:data.error.msg});
                else
                    this.setState({error:data.error});
            }
            else{
                this.setState({id:data._id,name:data.name,email:data.email})
            }
        })
    }
    //client side validation
    isValid = () =>{
        const {name,email,password,filesize} = this.state;
        if(filesize > 100000){
            this.setState({error:"Image should be less than 100kb"})
            return false
        }
        if(name.length === 0){
            this.setState({error:"Name is required"})
            return false
        }
        if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            this.setState({error:"Email is invalid"})
            return false
        }
        if(password.length >= 1 && password.length<=5 ){
            this.setState({error:"Password must be 6 characters long"})
        }
        return true
    }

    componentDidMount(){
        // using for image upload
        this.userData = new FormData()
        const userId = this.props.match.params.userId
        this.init(userId)
    }

    handleChange = (field)=> (event) => {
        const value = field === "photo" ?event.target.files[0] : event.target.value
        const filesize = field === "photo" ?event.target.files[0].size : 0
        this.userData.set(field,value)
        this.setState({
            [field]: value,
            filesize
        })
    }

    clickSubmit = (event) =>{
        event.preventDefault();
        this.setState({
            loading:true
        })
        if(this.isValid()){
            const userId = this.state.id
            const token = isAuthenticated().token
            update(userId,token,this.userData)
            .then(data=>{
                if(data.error){
                    if(data.error.msg)
                        this.setState({error:data.error.msg,loading:false});
                    else
                        this.setState({error:data.error,loading:false});
                }
                else{
                    //console.log(data)
                    this.setState({
                        redirect:true
                    })
                }
            })
        }
        
    }

    editForm(name,email,password){
        return (
            <form>
                    <div className="form-group">
                        <label className="text-muted">Name</label>
                        <input onChange={this.handleChange("name")} className="form-control" type="text" value={name}></input>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Email</label>
                        <input onChange={this.handleChange("email")} className="form-control" type="email" value={email}></input>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Profile Pic:</label>
                        <input onChange={this.handleChange("photo")} className="form-control"
                        accept="image/*" type="file" ></input>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Password</label>
                        <input onChange={this.handleChange("password")} className="form-control" type="password" value={password}></input>
                    </div>
                    <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Update</button>
                </form>
        )
    }

    render(){
        const {id,name,email,password,redirect} = this.state;
        if(redirect)
            return <Redirect to={`/user/${id}`}/>
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">
                    Edit Profile
                </h2>
                    {this.state.loading?(<div className="jumbotron text-center">
                    <h2>Loading...</h2>
                    </div>):("")}
                    <div className="alert alert-danger" style={{display: this.state.error ? "":"none" }}>
                        {this.state.error}
                    </div>
                    { this.editForm(name,email,password) }
            </div>
        )
    }
}


export default EditProfile