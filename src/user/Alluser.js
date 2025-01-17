import React, {Component} from 'react'
import {list_users} from './userApi'
import DefaultPorofileImg from '../img/user.png'
import {Link} from 'react-router-dom'

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
                    
                    <img src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`}
                    onError={i=>(i.target.src = `${DefaultPorofileImg}`)}
                    alt={DefaultPorofileImg} style={{
                                width:"auto",
                                height: "250px",  
                            }}/>
                    
                        <div className="card-body text-center">
                            <h5 className="card-title">{user.name}</h5>
                            <p className="card-text">{user.email}</p>
                            <Link to={`/user/${user._id}`} className="btn btn-raised btn-sm btn-primary">View Profile</Link>
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