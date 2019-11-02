// By: Niklas Impiö
import React from "react"
import {connect} from "react-redux"
import {Route} from "react-router-dom"

import LoginForm from "./LoginForm"

import About from "./About"
import ProjectInfo from "./ProjectInfo"
import MapContainerOpen from "./MapContainerOpen"

import "../styles/containers.css"
import PopUpContainer from "./PopUpContainer"


import {notify} from "../reducers/notificationReducer"
import NewPost from "./NewPost"
import NewPostCombined from "./NewPostCombined"
import PostView from "./PostView"

const ContentArea = (props) => {

  return (
    <div className="contentContainer">
      <Route path ="/" render={({history}) => (

        <MapContainerOpen posts={props.posts} history={history}/>

      )}/>
      <Route path="/login" render={({history}) => (
        <PopUpContainer history={history}>
          <LoginForm history={history}/>
        </PopUpContainer>

      )}/>
      <Route path="/about" render={({history}) => (
        <PopUpContainer history={history}>
          <About history={history}/>
        </PopUpContainer>
      )}/>
      <Route path="/project-info" render={({history}) => (
        <PopUpContainer history={history}>
          <ProjectInfo history={history}/>
        </PopUpContainer>
      )}/>
      <Route path="/new-post" render={({history}) => (
        <PopUpContainer history={history}>
          <NewPostCombined history={history}/>
        </PopUpContainer>
      )}/>
      <Route exact path="/post-view/:id" render={({match,history}) => (
        <PopUpContainer history={history}>
          <PostView match={match} history={history}/>
        </PopUpContainer>
      )}/>

    </div>

  )

}


const mapStateToProps = (state) => {
  return {
    //maps state to props, after this you can for example call props.notification
    notification: state.notification,
    user: state.user,
    posts: state.posts

  }
}

const mapDispatchToProps = {
  //connect reducer functions/dispatchs to props
  //notify (for example)
  notify,

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentArea)
