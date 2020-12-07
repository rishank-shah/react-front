import React, {Component} from 'react'
import {list_users} from './userApi'

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
        <div className="card">
            {users.map((user,i)=>(
                <div key={i}>
                    <p>{user.name}</p>
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