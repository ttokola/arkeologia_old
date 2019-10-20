import React, {useEffect} from "react"
import {connect} from "react-redux"
import {Route, BrowserRouter as Router} from "react-router-dom"



//import dispatch methods
import {notify} from "./reducers/notificationReducer"
import {login, logout, initLoggedUser} from "./reducers/loginReducer"
import {initPosts} from "./reducers/postReducer"

//import components
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import NavMenu from "./components/NavMenu"
import About from "./components/About"
import ProjectInfo from "./components/ProjectInfo"
import MapContainerOpen from "./components/MapContainerOpen"

import "./styles/containers.css"


const App = (props) => {
  //do stuff when initialized
  useEffect(() => {
    console.log("app hook")
    const loggedUserJSON = window.localStorage.getItem("loggedUser")

    if(loggedUserJSON && !props.user){
      //init user if localstorage has user saved.
      console.log("initing user")
      const user = JSON.parse(loggedUserJSON)
      props.initLoggedUser(user)
    }
    if(props.posts.length === 0){
      console.log("initing posts")
      props.initPosts()
    }
    document.title = "Chimneys GO"
  }, [props])

  const notifyClick = (event) => {
    event.preventDefault()
    console.log(props)
    //notify parameters are (String:message, Boolean:error, int:duration in seconds)
    props.notify("This is a notification.", false, 5)
    //triggers 5 second non error notification with message "This is a notification."
  }




  return (
    //returns what to render
    <div className="appContainer">
      <Router>

        <Route path="/" render={({history}) => (
          <NavMenu history={history}/>
        )}/>
        <Route exact path ="/" render={({history}) => (

          <MapContainerOpen posts={props.posts}/>

        )}/>
        <Route path="/login" render={({history}) => (
          <LoginForm history={history}/>
        )}/>
        <Route path="/about" render={({history}) => (
          <About history={history}/>
        )}/>
        <Route path="/project-info" render={({history}) => (
          <ProjectInfo history={history}/>
        )}/>

        {(props.notification.message !== null)?
          <Notification/>
          :
          <div></div>
        }

      </Router>

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
  login,
  logout,
  initLoggedUser,
  initPosts

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
