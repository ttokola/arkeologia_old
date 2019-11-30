// By: Niklas Impiö
import React, {useEffect, useState} from "react"
import {connect} from "react-redux"
import {Route, BrowserRouter as Router} from "react-router-dom"



//import dispatch methods
import {notify} from "./reducers/notificationReducer"
import {login, logout, initLoggedUser} from "./reducers/loginReducer"
import {initPosts} from "./reducers/postReducer"
import {initProjects} from "./reducers/projectReducer"
import {initSettings} from "./reducers/settingsReducer"

//import components
import Notification from "./components/Notification"
import NavMenu from "./components/NavMenu"
import "./styles/containers.css"
import ContentArea from "./components/ContentArea"
import ContentAreaMobile from "./componentsMobile/ContentAreaMobile"
import NotificationMobile from "./componentsMobile/NotificationMobile"


const App = (props) => {
  //do stuff when initialized
  const [postsInited, setPostsInited] = useState(false)
  const [projectsInitiated, setProjectsInitiated] = useState(false)
  const [settingsInitiated, setSettingsInitiated] = useState(false)

  const isMobile = window.innerWidth <= 500

  //const [userInited, setUserInited] = useState(false)
  useEffect(() => {
    console.log("app hook")
    const loggedUserJSON = window.localStorage.getItem("loggedUser")
    const settingsJSON = {language: window.localStorage.getItem("ChimneysGoLanguage"), theme: window.localStorage.getItem("ChimneysGoTheme")}
    console.log(settingsJSON)
    if(!settingsInitiated && settingsJSON){
      props.initSettings(settingsJSON)
      setSettingsInitiated(true)
    }


    if(!projectsInitiated && props.projects.active === null){
      console.log("trigger")
      props.initProjects()
      setProjectsInitiated(true)
    }

    if(loggedUserJSON && !props.user){
      //init user if localstorage has user saved.
      console.log("initing user")
      const user = JSON.parse(loggedUserJSON)
      props.initLoggedUser(user)
    }
    // needs a better way.
    if(!postsInited && props.projects.active){
      console.log(props.posts.length)
      props.initPosts(props.projects.active)
      setPostsInited(true)
    }

    document.title = "Chimneys GO"
  }, [props])

  if(isMobile){
    return(
      <div className="appContainer">
        <Router>
          <Route path="/" render={({history}) => (
            <ContentAreaMobile history={history}/>
          )}/>

          {props.notification.message !== null?
            <NotificationMobile/>
            :
            <div></div>
          }
        </Router>
      </div>
    )
  }else{
    return (
      //returns what to render
      <div className="appContainer">
        <Router>
          <Route path="/" render={({history}) => (
            <NavMenu history={history}/>
          )}/>
          <ContentArea/>
          {props.notification.message !== null?
            <Notification/>
            :
            <div></div>
          }
        </Router>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    //maps state to props, after this you can for example call props.notification
    notification: state.notification,
    user: state.user,
    posts: state.posts,
    projects: state.projects

  }
}

const mapDispatchToProps = {
  //connect reducer functions/dispatchs to props
  notify,
  login,
  logout,
  initLoggedUser,
  initPosts,
  initProjects,
  initSettings

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
