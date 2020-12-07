import React, {Component} from 'react'
import {list_users} from './userApi'
import DefaultPorofileImg from '../img/user.png'
class Alluser extends Component{
    constructor(){
        super();
        this.state = {
            users:[]
        }
    }
    componentDidMount(){
        list_users()
        .then(data=>{
            if(data.error){
                console.log(data.error)
            }
            else{
                this.setState({
                    users: data
                })
            }
        })
    }

    render_user = users =>(
        <div className="row">
            {users.map((user,i)=>(
                <div className="card col-md-3 mt-3 ml-3 " style={{width: "18rem"}} key={i}>
                    <img className="card-img-top" src={DefaultPorofileImg} alt={user.name} 
                    style={{width:'100%',height:'10vw',objectFit:'cover'}}
                    />
                        <div className="card-body text-center">
                            <h5 className="card-title">{user.name}</h5>
                            <p className="card-text">{user.email}</p>
                            <a href="#" className="btn btn-raised btn-sm btn-primary">View Profile</a>
                        </div>
                </div>
            ))}
        </div>
    )

    render(){
        const {users} = this.state
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">All Users</h2>
                
                {this.render_user(users)}

            </div>
        )
    }
}

export default Alluser