import React,{Component} from 'react'
import { Link } from 'react-router-dom'
import DefaultPorofileImg from '../img/user.png'

class ProfileTabs extends Component{
    render(){
        const {followers,following} = this.props
        return (
            <div>
                <div className="row">
                    <div className="col-md-4">
                        <h3>Followers</h3>
                        {followers.map((user,i)=>(
                            <div key = {i}>
                                <div className="row">
                                    <div>
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
                                        <div>
                                            <p className="lead">
                                                {user.name}
                                            </p>
                                        </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="col-md-4">
                        <h3>Following</h3>
                        {following.map((user,i)=>(
                            <div key = {i}>
                                <div className="row">
                                    <div>
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
                                        <div>
                                            <p className="lead">
                                                {user.name}
                                            </p>
                                        </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* <div className="col-md-4">
                        <h3>Followers</h3>
                    </div> */}
                </div>
            </div>
        )
    }
}

export default ProfileTabs