// By: Niklas Impiö
import React from "react"
import {connect} from "react-redux"
import {logout} from "../reducers/loginReducer"
import {notify} from "../reducers/notificationReducer"


import "../styles/navMenu.css"

import ProjectDropDown from "./ProjectDropDown"
import HorizontalMenuList from "./HorizontalMenuList"


export const NavMenu = (props) => {
  //Nav menu container component that has the menu components embedded.

  const toProjectMenu = (event) => {
    event.preventDefault()
    props.history.push("/project-info/")
  }
  const toRoot = (event) => {
    //pushes url route to root or "/", might change later when different projects implemented.
    event.preventDefault()
    props.history.push("/")
  }
  return (
    <div className="menuContainer">
      <div className="menuInnerContainer">
        <div className="menuLogo" >
          <p className="logoText" onClick={toRoot}>Chimneys GO</p>
        </div>
        <div className="projectSelectContainer">

          <ProjectDropDown/>
          <div className="projectInfoButtonContainer">
            <button className="projectInfoButton" onClick={toProjectMenu}>{props.settings.strings["project_info"]}</button>
          </div>
        </div>
        <HorizontalMenuList history={props.history}/>
      </div>
    </div>


  )
}

const mapStateToProps = (state) => {
  return {
    //maps state to props, after this you can for example call props.notification
    user: state.user,
    settings: state.settings
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