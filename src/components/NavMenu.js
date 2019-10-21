import React, {useState, useEffect, useRef} from "react"
import {connect} from "react-redux"
import {logout} from "../reducers/loginReducer"
import {notify} from "../reducers/notificationReducer"
import DropDownList from "./DropDownList"

import "../styles/navMenu.css"
import useComponentVisible from "../hooks/OutsideClick"

export const NavMenu = (props) => {

  const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(false)
  const toggleDDV = (event) => {
    //DDV = dropDownVisibility
    event.preventDefault()
    console.log("toggling dropdown visibility")
    setIsComponentVisible(true)
    
  }

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
    props.logout(props.notify)
  }
  const loginClick = (event) => {
    event.preventDefault()
    props.history.push("/login")

  }
  console.log(props)
  return (
    <div className="menuContainer">

      <div className="menuGrid">
        <div className="menuLogo">
          <p className="logoText">Chimneys GO</p>
        </div>
        <ul className="menuButtonList">
          {props.user?
            <li className="menuListItem" onClick={logoutClick}>
              <p className="menuItemText">{props.user.username} Logout</p>
            </li>
            :
            <li className="menuListItem" onClick={toggleDDV}>
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
      <div className="maxWidthContainer" ref={ref}>
        {isComponentVisible?
          <div className="accountDropDownContainer">
            <DropDownList  items={[{text:"Activity", onClickHandler: null}, {text:"Configure", onClickHandler: null}, {text:"Logout", onClickHandler: null}]}/>
          </div>
          :
          <div/>
        }
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