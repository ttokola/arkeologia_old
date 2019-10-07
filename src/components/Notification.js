import React from "react"
import {connect} from "react-redux"
import {cancelNotification} from "../reducers/notificationReducer"
import "../styles/containers.css"
import "../styles/texts.css"
import "../styles/buttons.css"


const Notification = (props) => {
  console.log(props)
  console.log(`setting notification timer animation duration for ${props.notification.seconds} seconds;`)

  let index = null

  for(let i=0;i<document.styleSheets[0].cssRules.length;i++){

    if(document.styleSheets[0].cssRules[i]["selectorText"] === ".timeRemaining"){
      index = i
      break
    }
  }
  if (index) {
    document.styleSheets[0].cssRules[index].style["animationDuration"] = `${props.notification.seconds}s`

  }



  const closeNotification = (event) => {
    event.preventDefault()
    clearTimeout(props.notification.cancel)
    props.cancelNotification()

  }
  return (

    <div name="notificationContainerInner" className="notificationContainerInner">
      <div className="notificationGrid">
        {props.notification.error?
          <p className="notificationHeader headerText">Error</p>
          :
          <p className="notificationHeader headerText">Notification</p>
        }

        <p className="notificationDescription">{props.notification.message}</p>
        <button onClick={closeNotification} className="notificationButton rippleButton">Close</button>
      </div>
      <div className="notificationTimer">
        <div className="timeRemaining"></div>
      </div>


    </div>




  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }

}

export default connect(
  mapStateToProps,
  {cancelNotification}
)(Notification)