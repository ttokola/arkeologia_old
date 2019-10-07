import React, {useEffect} from "react"
import {connect} from "react-redux"
import "./styles/containers.css"
import "./styles/texts.css"
import "./styles/buttons.css"


//import dispatch method from reducer see mapDispatchToProps what happens next
import {notify} from "./reducers/notificationReducer"

import Notification from "./components/Notification"


const App = (props) => {
  //do stuff when initialized
  useEffect(() => {
    console.log("app hook")
    document.title = "Chimneys GO"
  }, [])

  const notifyClick = (event) => {
    console.log(props)
    //notify parameters are (String:message, Boolean:error, int:duration in seconds)
    props.notify("This is a notification.", false, 5)
    //triggers 5 second non error notification with message "This is a notification."
  }
  console.log(props)
  return (
    //returns what to render
    <div className="appContainer">
      <button className="rippleButton" onClick={notifyClick}>Notify Me</button>
      
      {(props.notification.message !== null)?
        <Notification/>
        :
        <div></div>
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    //maps state to props, after this you can for example call props.notification
    notification: state.notification

  }
}

const mapDispatchToProps = {
  //connect reducer functions/dispatchs to props
  //notify (for example)
  notify

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
