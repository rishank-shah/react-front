import React,{Component} from 'react'
import {isAuthenticated} from '../auth/'
import {Redirect,Link} from 'react-router-dom'
import {read_user_info} from './userApi'
import DefaultPorofileImg from '../img/user.png'
import DeleteUser from './DeleteUser'
import FollowProfile from './FollowProfile'
import ProfileTabs from './ProfileTabs'
class Profile extends Component{
    constructor(){
        super()
        this.state = {
            user: {following:[],followers:[]},
            redirectToSignIn: false,
            following:false,
            error:""
        }
    }


    checkFollow =(user) =>{
        const jwt = isAuthenticated()
        const match = user.followers.find(follower=>{
            return follower._id === jwt.user._id
        })
        return match
    }


    clickFollowButton = (url) =>{
        const userId = isAuthenticated().user._id
        const token = isAuthenticated().token
        url(userId,token,this.state.user._id)
        .then(data=>{
            if(data.error)
                this.setState({error:data.error})
            else{
                this.setState({user:data,following:!this.state.following})
            }
        })
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
                let following = this.checkFollow(data)
                this.setState({user:data,following:following})
            }
        })
    }

    componentDidMount(){
        const userId = this.props.match.params.userId
        this.init(userId)
    }

    componentWillReceiveProps (props){
        const userId = this.props.match.params.userId
        this.init(userId)
    }

    render(){
        const redirect = this.state.redirectToSignIn
        if (redirect){
            return <Redirect to="/signin" />
        }
        const photoUrl = this.state.user._id ? `${process.env.REACT_APP_API_URL}/user/photo/${this.state.user._id}?${new Date().getTime()}` : DefaultPorofileImg
        return (
            <div className="container">
                <h2 className="mt-5 mb-3 text-center">Profile</h2>
                <div className="row">
                    <div className="col-md-4">
                        <div style={{borderRadius: "50%"}}>
                        <img src={photoUrl} alt={this.state.user.name} onError={i=>(i.target.src = `${DefaultPorofileImg}`)} style={{
                                width:"25vw",
                                height: "25vw",
                                borderTopLeftRadius: "50% 50%",
                                borderTopRightRadius: "50% 50%",
                                borderBottomRightRadius: "50% 50%",
                                borderBottomLeftRadius: "50% 50%"    
                            }}/>
                        </div>
                    </div>
                    <div className="col-md-6 mt-5 ml-5">
                        <div className="container lead mt-5">
                                <p>
                                    Hello {this.state.user.name}
                                </p>
                                <p>
                                    Email: {this.state.user.email}
                                </p>
                                    <p className="lead">About : {this.state.user.about}</p>
                                <p>
                                    {`Joined ${new Date(this.state.user.created).toDateString()}`}
                                </p>
                        </div>
                        { isAuthenticated().user && isAuthenticated().user._id === this.state.user._id ? (
                            <div className="d-inline-block mt-5"> 
                                <Link className="btn btn-raised btn-success mr-5" to={`edit/${this.state.user._id}`}>
                                    Edit Profile
                                </Link>
                                <DeleteUser userId= {this.state.user._id}/>
                            </div>
                        ):(
                            <FollowProfile following={this.state.following}
                            onButtonClick={this.clickFollowButton}
                            />
                        )
                        
                        }
                        
                    </div>
                    <div className="col-md-12">
                        <hr/>
                        <ProfileTabs followers={this.state.user.followers} following={this.state.user.following}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile