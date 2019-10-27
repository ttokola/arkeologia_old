// By: Niklas Impiö
import React from "react"
import {connect} from "react-redux"
import {logout} from "../reducers/loginReducer"
import {notify} from "../reducers/notificationReducer"


import "../styles/navMenu.css"

import DropDownSelect from "./DropDownSelect"
import HorizontalMenuList from "./HorizontalMenuList"

export const NavMenu = (props) => {


  const toRoot = (event) => {
    event.preventDefault()
    props.history.push("/")
  }
  return (
    <div className="menuContainer">

      <div className="menuGrid">
        <div className="menuLogo" onClick={toRoot}>
          <p className="logoText">Chimneys GO</p>
        </div>
        <DropDownSelect currentlySelected={"Project 0"}/>
        <HorizontalMenuList history={props.history}/>
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