import React, {Component} from 'react'
import {single_post,update_post} from './api'
import {isAuthenticated} from '../auth/'
import { Redirect } from 'react-router-dom'
import DefaultPost from '../img/post.png'

class EditPost extends Component {
  constructor() {
    super()
    this.state ={
      id:'',
      title:"",
      body:"",
      redirect:false,
      error:"",
      photo:"",
      filesize:0,
      loading:false
    }
  }

  init = (postId) => {
      single_post(postId)
      .then(data=>{
          if(data.error){
              if(data.error)
                  this.setState({error:data.error,redirect:true});
          }
          else{
              this.setState({id:data._id,title:data.title,body:data.body,error:""})
          }
      })
  }


  isValid = () =>{
      const {title,body,filesize} = this.state;
      if(filesize > 100000){
          this.setState({error:"Image should be less than 100kb"})
          return false
      }
      if(title.length === 0){
          this.setState({error:"Title is required"})
          return false
      }
      if(title.length > 50){
          this.setState({error:"Title should be less than 50 characters"})
          return false
      }
      if(body.length > 2000 ){
          this.setState({error:"Body should be less than 2000 characters"})
          return false
      }
      if(body.length === 0){
          this.setState({error:"Body is required"})
          return false
      }
      return true
  }


  clickSubmit = (event) =>{
      event.preventDefault();
      if(this.isValid()){
          this.setState({
              loading:true
          })
          const postId = this.state.id
          const token = isAuthenticated().token
          update_post(postId,token,this.postData)
          .then(data=>{
              if(data.error){
                  this.setState({error:data.error,loading:false});
              }
              else{
                  this.setState({
                      loading:false,
                      title:"",
                      body:"",
                      photo:"",
                      redirect:true
                  });
              }
          })
      }
  }

  handleChange = (field)=> (event) => {
      this.setState({
          error:"",
      })
      const value = field === "photo" ?event.target.files[0] : event.target.value
      const filesize = field === "photo" ?event.target.files[0].size : 0
      this.postData.set(field,value)
      this.setState({
          [field]: value,
          filesize
      })
  }

  componentDidMount(){
      this.postData = new FormData()
      const postId = this.props.match.params.postId
      this.init(postId)
  }

  editForm(title,body){
      return (
          <form>
                  <div className="form-group">
                      <label className="text-muted">Post Pic:</label>
                      <input onChange={this.handleChange("photo")} className="form-control"
                      accept="image/*" type="file" ></input>
                  </div>
                  <div className="form-group">
                      <label className="text-muted">Title</label>
                      <input onChange={this.handleChange("title")} className="form-control" type="text" value={title}></input>
                  </div>
                  <div className="form-group">
                      <label className="text-muted">Body</label>
                      <textarea onChange={this.handleChange("body")} className="form-control" type="text" value={body}></textarea>
                  </div>
                  <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Update Post</button>
              </form>
      )
  }


  render(){
    const {title,body,redirect,id} = this.state
    if(redirect){
        return <Redirect to={`/`}/>
    }
    return(
      <div className="container mt-5">
          <h2>Edit Post</h2>
          {this.state.loading?(<div className="jumbotron text-center">
          <h2>Loading...</h2>
          </div>):("")}
          <div className="alert alert-danger" style={{display: this.state.error ? "":"none" }}>
              {this.state.error}
          </div>


          <img src={`${process.env.REACT_APP_API_URL}/post/photo/${id}`}
          onError={
              i=>i.target.src = `${DefaultPost}`
          }
          className="img-thumbnail mb-2 mt-2"
          style ={{height:"250px",width:"auto"}}
          alt={title}/>

          {this.editForm(title,body)}
      </div>
    )
  }
}


export default EditPost
