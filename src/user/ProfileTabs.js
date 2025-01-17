import React,{Component} from 'react'
import { Link } from 'react-router-dom'
import DefaultPorofileImg from '../img/user.png'

class ProfileTabs extends Component{
    render(){
        const {followers,following,posts} = this.props
        return (
            <div>
                <div className="row">
                    
                    <div className="col-md-4 mt-3">
                        <hr/>
                        <h3>Followers</h3>
                        <h5>{followers.length ? '':"No followers"}</h5>
                        {followers.map((user,i)=>(
                            <div key = {i}>
                                <div className="row">
                                    <div className="mt-2">
                                        <Link to={`/user/${user._id}`}>
                                            <img className="float-left" height="30px" src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`} alt={user.name} onError={i=>(i.target.src = `${DefaultPorofileImg}`)}
                                            style={{
                                            height:"50px",
                                            width:"50px",
                                            borderTopLeftRadius: "50% 50%",
                                            borderTopRightRadius: "50% 50%",
                                            borderBottomRightRadius: "50% 50%",
                                            borderBottomLeftRadius: "50% 50%",
                                            border: "1px solid black"
                                            }}
                                            />
                                            <span className="ml-1 mt-2 lead">{user.name}</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="col-md-4 mt-3">
                        <hr/>
                        <h3>Following</h3>
                        <h5>{following.length ? '':"No following"}</h5>
                        {following.map((user,i)=>(
                            <div key = {i}>
                                <div className="row">
                                    <div className="mt-2">
                                        <Link to={`/user/${user._id}`}>
                                                <img className="float-left" height="30px" src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`} alt={user.name} onError={i=>(i.target.src = `${DefaultPorofileImg}`)} style={{
                                                height:"50px",
                                                width:"50px",
                                                borderTopLeftRadius: "50% 50%",
                                                borderTopRightRadius: "50% 50%",
                                                borderBottomRightRadius: "50% 50%",
                                                borderBottomLeftRadius: "50% 50%",
                                                border: "1px solid black"
                                            }}
                                            />
                                                <span className="ml-1 mt-2 lead">{user.name}</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="col-md-4 mt-3">
                        <hr/>
                        <h3>Posts</h3>
                        <h5>{posts.length ? '':"No posts"}</h5>
                        {posts.map((post,i)=>(
                            <div key = {i}>
                                <div className="row">
                                    <div className="mt-2">
                                        <Link to={`/post/${post._id}`}>
                                            <span className="lead mr-2">
                                                {post.title}
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfileTabs