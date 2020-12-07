import React,{Component} from 'react'
import {isAuthenticated} from '../auth/'
import {Redirect,Link} from 'react-router-dom'
import {read_user_info} from './userApi'

class Profile extends Component{
    constructor(){
        super()
        this.state = {
            user: "",
            redirectToSignIn: false
        }
    }

    init = (userId) => {
        const token = isAuthenticated().token
        read_user_info(userId,token)
        .then(data=>{
            if(data.error){
                this.setState({
                    redirectToSignIn:true
                })
            }
            else{
                //console.log(data)
                this.setState({user:data})
            }
        })
    }

    componentDidMount(){
        const userId = this.props.match.params.userId
        this.init(userId)
    }

    render(){
        const redirect = this.state.redirectToSignIn
        if (redirect){
            return <Redirect to="/signin" />
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h2 className="mt-5 mb-5">Profile</h2>
                        <p>
                            Hello {isAuthenticated().user.name}
                        </p>
                        <p>
                            Email: {isAuthenticated().user.email}
                        </p>
                        <p>
                            {`Joined ${new Date(this.state.user.created).toDateString()}`}
                        </p>
                    </div>
                    <div className="col-md-6">
                        { isAuthenticated().user && isAuthenticated().user._id == this.state.user._id && (
                            <div className="d-inline-block mt-5"> 
                                <Link className="btn btn-raised btn-success mr-5" to={`user/edit/${this.state.user._id}`}>
                                    Edit Profile
                                </Link>
                                <button className="btn btn-raised btn-danger mr-5">
                                    Delete Profile
                                </button>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        );
    }
}

export default Profile