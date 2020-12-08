import React, { Component } from "react";
import { isAuthenticated } from "../auth"
import { remove } from './userApi'
import { Signout } from './Signout'
import { Redirect } from "react-router-dom";

class DeleteUser extends Component{

    state = {
        redirect: false
    }

    deleteAccount = () =>{
        const token = isAuthenticated().token
        const userId = this.props.userId
        remove(userId,token)
        .then(data=>{
            if(data.error)
                console.log(data.error)
            else{
                Signout(()=>{
                    console.log("User Deleted Sucessfully")
                });
                this.setState({
                    redirect:true
                })
            }
        })
    }

    deleteConfirm = () =>{
        let answer = window.confirm("Are you sure you want to delete your account?")
        if(answer){
            this.deleteAccount()
        }
    }

    render(){
        if(this.state.redirect){
            return <Redirect to="/signup"/>
        }
        return(
            <button onClick={this.deleteConfirm} className="btn btn-raised btn-danger mr-5">
                Delete Profile
            </button>
        )
    }
}

export default DeleteUser