import React,{Component} from 'react';
import { Redirect } from 'react-router-dom';
import {signin,authenticate} from '../auth/'

class Signin extends Component{
    constructor(){
        super();
        this.state = {
            email: "",
            password: "",
            error:"",
            redirectToReferer: false,
            loading: false
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (field)=> (event) =>{
        this.setState({
            error:""
        })
        this.setState({
            [field]: event.target.value
        });
    }

    clickSubmit = (event) =>{
        event.preventDefault();
        this.setState({
            loading:true
        })
        const {email,password} = this.state;
        const user = {
            email: email,
            password: password
        }
        signin(user)
        .then(data=>{
            //console.log(data)
            if(data.error){
                if(data.error.msg)
                    this.setState({error:data.error.msg,loading:false});
                else
                    this.setState({error:data.error,loading:false});
            }
            else{
                authenticate(data,()=>{
                    this.setState({
                        redirectToReferer:true
                    })
                })
            }
        })
    }

    signInForm(){
        return (
            <form>
                    <div className="form-group">
                        <label className="text-muted">Email</label>
                        <input onChange={this.handleChange("email")} className="form-control" type="email" value={this.state.email}></input>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Password</label>
                        <input onChange={this.handleChange("password")} className="form-control" type="password" value={this.state.password}></input>
                    </div>
                    <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Submit</button>
                </form>
        )
    }

    render(){

        if(this.state.redirectToReferer){
            return <Redirect to="/" />
        }

        return(
            <div className="container">
                <h2 className="mt-5 mb-5">SignIn</h2>
            
                <div className="alert alert-danger" style={{display: this.state.error ? "":"none" }}>
                    {this.state.error}
                </div>

                {this.state.loading?(<div className="jumbotron text-center">
                    <h2>Loading...</h2>
                </div>):("")}

                {this.signInForm()}
            </div>
        )
    }
}

export default Signin;