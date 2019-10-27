// By: Niklas Impiö
import React, {useEffect, useState} from "react"
import {connect} from "react-redux"
import {Route, BrowserRouter as Router} from "react-router-dom"



//import dispatch methods
import {notify} from "./reducers/notificationReducer"
import {login, logout, initLoggedUser} from "./reducers/loginReducer"
import {initPosts} from "./reducers/postReducer"

//import components
import Notification from "./components/Notification"
import NavMenu from "./components/NavMenu"
import "./styles/containers.css"
import ContentArea from "./components/ContentArea"



const App = (props) => {
  //do stuff when initialized
  const [postsInited, setPostsInited] = useState(false)
  const [userInited, setUserInited] = useState(false)
  useEffect(() => {
    console.log("app hook")
    const loggedUserJSON = window.localStorage.getItem("loggedUser")


    if(loggedUserJSON && !props.user){
      //init user if localstorage has user saved.
      console.log("initing user")
      const user = JSON.parse(loggedUserJSON)
      props.initLoggedUser(user)
    }
    // needs a better way.
    if(!postsInited){
      console.log(props.posts.length)
      props.initPosts()
      setPostsInited(true)
    }

    document.title = "Chimneys GO"
  }, [props])

  return (
    //returns what to render
    <div className="appContainer">
      <Router>

        <Route path="/" render={({history}) => (
          <NavMenu history={history}/>
        )}/>
        <ContentArea/>

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
