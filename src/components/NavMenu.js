import React from "react"
import {connect} from "react-redux"
import {logout} from "../reducers/loginReducer"
import {notify} from "../reducers/notificationReducer"
import "../styles/navMenu.css"

export const NavMenu = (props) => {

  const aboutClick = (event) => {
    event.preventDefault()
    props.history.push("/about")
  }
  const projectInfoClick = (event) => {
    event.preventDefault()
    props.history.push("/project-info")
  }

  const logoutClick = (event) => {
    event.preventDefault()
    console.log("Logging out")
    props.logout()
  }
  const loginClick = (event) => {
    event.preventDefault()
    props.history.push("/login")

  }
  console.log(props)
  return (
    <div className="altMenuContainer">
      <div className="altMenuGrid">
        <div className="altMenuLogo">
          <p className="logoText">Chimneys GO</p>
        </div>
        <ul className="altMenuButtonList">
          {props.user?
            <li className="menuListItem" onClick={logoutClick}>
              <p className="menuItemText">{props.user.username} Logout</p>
            </li>
            :
            <li className="menuListItem" onClick={loginClick}>
              <p className="menuItemText">Log In</p>
            </li>
          }
          <li name="" className="menuListItem" onClick={aboutClick}>

            <p name="" className="menuItemText">About</p>
          </li>
          <li name="" className="menuListItem" onClick={projectInfoClick}>

            <p name="" className="menuItemText">Project Info</p>
          </li>

        </ul>

      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    //maps state to props, after this you can for example call props.notification
    user: state.user

  }
}

const mapDispatchToProps = {
  //connect reducer functions/dispatchs to props
  //notify (for example)
  notify,
  logout
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavMenu)