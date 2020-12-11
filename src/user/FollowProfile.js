import React , {Component} from 'react'
import {followApi} from './userApi'

class FollowProfile extends Component{
    follow = ()=>{
        this.props.onButtonClick(followApi)
    }

    render(){
        return (
            <div className="d-inline-block ml-2">
                {
                    this.props.following?(<button className="btn btn-danger btn-raised">
                    UnFollow
                </button>):(<button onClick={this.follow} className="btn btn-success btn-raised mr-5">
                    Follow
                </button>)
                }
                
            </div>
        )
    }
}

export default FollowProfile