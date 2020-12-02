import React,{Component} from 'react';

class Signup extends Component{
    constructor(){
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            error:"",
            open: false //sucessfully register
        }
        this.handleChange = this.handleChange.bind(this);
    }
    
    //as onchange is an event handler we will get a event
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
        const {name,email,password} = this.state;
        const user = {
            name: name,
            email: email,
            password: password
        }
        //console.log(user)
        this.Signup(user)
        .then(data=>{
            //console.log(data)
            if(data.error){
                if(data.error.msg)
                    this.setState({error:data.error.msg});
                else
                    this.setState({error:data.error});
            }
            else
                this.setState({
                    name: "",
                    email: "",
                    password: "",
                    error:"",
                    open: true
                });
        })
    }

    Signup(user) {
        return fetch('http://localhost:8080/signup', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(res => {
            return res.json();
        })
        .catch(err => console.log(err));
    }

    signUpForm(){
        return (
            <form>
                    <div className="form-group">
                        <label className="text-muted">Name</label>
                        <input onChange={this.handleChange("name")} className="form-control" type="text" value={this.state.name}></input>
                    </div>
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
        return(
            <div className="container">
                <h2 className="mt-5 mb-5">Signup</h2>
            
                <div className="alert alert-danger" style={{display: this.state.error ? "":"none" }}>
                    {this.state.error}
                </div>

                <div className="alert alert-success" style={{display: this.state.open ? "":"none" }}>
                    New Account Created Sucessfully. Please Signin.
                </div>

                {/* we can directly user form here also */}
                {this.signUpForm()}
            </div>
        )
    }
}

export default Signup;