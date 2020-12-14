import React, {Component} from 'react'
import {findUser,followApi} from './userApi'
import DefaultPorofileImg from '../img/user.png'
import {Link} from 'react-router-dom'
import {isAuthenticated} from '../auth'

class FindUser extends Component{
    constructor(){
        super();
        this.state = {
            users:[],
            error:"",
            message: false,
            followmessage:""
        }
    }
    componentDidMount(){
        const userId = isAuthenticated().user._id
        const token = isAuthenticated().token
        findUser(userId,token)
        .then(data=>{
            if(data.error){
                this.setState({error:data.error})
            }
            else{
                this.setState({
                    users: data
                })
            }
        })
    }

    clickFollow(user,i){
        const userId = isAuthenticated().user._id
        const token = isAuthenticated().token
        followApi(userId,token,user._id)
        .then(data=>{
            if(data.error){
                this.setState({error:data.error})
            }
            else{
                let list_users = this.state.users
                list_users.splice(i,1)
                this.setState({
                    users:list_users,
                    message: true,
                    followmessage:`Following ${user.name}`
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
                            <button onClick={()=> this.clickFollow(user,i)} className="btn btn-raised btn-sm btn-success float-right">
                                Follow
                            </button>
                        </div>
                </div>
            ))}
        </div>
    )

    render(){
        const {users,message,followmessage} = this.state
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Suggested Users</h2>
                {message && (<div className="alert alert-success">
                    <p> {followmessage} </p>
                </div>)}
                {this.render_user(users)}

            </div>
        )
    }
}

export default FindUser