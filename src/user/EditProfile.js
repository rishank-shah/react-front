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
            error:""
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

    componentDidMount(){
        const userId = this.props.match.params.userId
        this.init(userId)
    }

    handleChange = (field)=> (event) => {
        this.setState({
            [field]: event.target.value
        })
    }

    clickSubmit = (event) =>{
        event.preventDefault();
        const {name,email,password} = this.state;
        const user = {
            name:name,
            email: email,
            password: password || undefined
        }
        const userId = this.state.id
        const token = isAuthenticated().token
        update(userId,token,user)
        .then(data=>{
            if(data.error){
                if(data.error.msg)
                    this.setState({error:data.error.msg});
                else
                    this.setState({error:data.error});
            }
            else{
                console.log(data)
                this.setState({
                    redirect:true
                })
            }
        })
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
                    <div className="alert alert-danger" style={{display: this.state.error ? "":"none" }}>
                        {this.state.error}
                    </div>
                    { this.editForm(name,email,password) }
                </h2>
            </div>
        )
    }
}


export default EditProfile