import React, {useEffect} from "react"
import {connect} from "react-redux"
import {Route, BrowserRouter as Router} from "react-router-dom"

import LoginForm from "./LoginForm"

import About from "./About"
import ProjectInfo from "./ProjectInfo"
import MapContainerOpen from "./MapContainerOpen"

import "../styles/containers.css"
import PopUpContainer from "./PopUpContainer"


import {notify} from "../reducers/notificationReducer"

const ContentArea = (props) => {

  return (
    <div className="contentContainer">
      <Route path ="/" render={({history}) => (

        <MapContainerOpen posts={props.posts}/>

      )}/>
      <Route path="/login" render={({history}) => (
        <PopUpContainer history={history}>
          <LoginForm history={history}/>
        </PopUpContainer>

      )}/>
      <Route path="/about" render={({history}) => (
        <About history={history}/>
      )}/>
      <Route path="/project-info" render={({history}) => (
        <ProjectInfo history={history}/>
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
