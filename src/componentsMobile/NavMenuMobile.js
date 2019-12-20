// By: Niklas Impiö
import React, {useState} from "react"
import {connect} from "react-redux"
import {logout} from "../reducers/loginReducer"
import {notify} from "../reducers/notificationReducer"


import "../styles/navMenu.css"
import "../stylesMobile/navMenuMobile.css"
import {ReactComponent as MenuIcon} from "../resources/menu.svg"

import ProjectDropDown from "../components/ProjectDropDown"
import LanguageDropDown from "../components/LanguageDropDown"
import ThemeToggleSwitch from "../components/ThemeToggleSwitch"
import DropDownList from "../components/DropDownList"


export const NavMenuMobile = (props) => {
  const [visible, setVisible] = useState(false)
  //Nav menu container component that has the menu components embedded.

  const toggleVisibity = () => {
    setVisible(!visible)
  }

  const aboutClick = (event) => {
    event.preventDefault()
    props.history.push("/about/")
    toggleVisibity()

  }

  const toMyPostsClick = (event) => {
    event.preventDefault()
    props.history.push("/my-posts/")
    toggleVisibity()
  }

  const logoutClick = (event) => {
    event.preventDefault()
    console.log("Logging out")
    props.logout(props.notify)
    toggleVisibity()
  }
  const toLoginClick = (event) => {
    event.preventDefault()
    props.history.push("/login")
    toggleVisibity()
  }

  const toSignUp = (event) => {
    event.preventDefault()
    props.history.push("/sign-up")
    toggleVisibity()
  }

  const toProjectMenu = (event) => {
    event.preventDefault()
    props.history.push("/project-info/")
    toggleVisibity()
  }

  const toUserSettingsClick = (event) => {
    event.preventDefault()
    props.history.push("/account-settings/")
    toggleVisibity()
  }

  const toRoot = (event) => {
    //pushes url route to root or "/", might change later when different projects implemented.
    event.preventDefault()
    props.history.push("/")
    toggleVisibity()
  }
  if(visible){
    return (
      <div className="mobileMenuContainerOuter">
        <div className="popUpBackground" onClick={toggleVisibity}/>
        <div className="mobileMenuContainer">
          <div className="mobileMenuLogoContainer">
            <button className="mobileMenuToggleButton">
              <MenuIcon onClick={toggleVisibity} className="menuIconInverted"/>
            </button>
            <div className="menuLogoMobile" >
              <h1 className="logoTextMobile" onClick={toRoot}>Chimneys GO</h1>
            </div>

          </div>
          <div className="divider"/>
          <div className="mobileMenuProjectContainer">
            <ProjectDropDown/>
            <button className="mobileMenuButton" onClick={toProjectMenu}>{props.settings.strings["project_info"]}</button>
          </div>
          <div className="divider"/>
          {props.user?
            <div className="mobileMenuNavigationContainer">
              <LanguageDropDown/>
              <ThemeToggleSwitch/>
            </div>
            :
            <div className="mobileMenuNavigationContainer">
              <button className="mobileMenuButton" onClick={toLoginClick}>{props.settings.strings["log_in"]}</button>
              <button className="mobileMenuButton" onClick={toSignUp}>{props.settings.strings["sign_up"]}</button>

            </div>
          }

          <div className="divider"/>
          {props.user?
            <div className="mobileMenuUserContainer">
              <DropDownList  items={[{string:props.settings.strings["my_posts"], onClickHandler: toMyPostsClick}, {string:props.settings.strings["account_settings"], onClickHandler: toUserSettingsClick},{string:props.settings.strings["about"], onClickHandler:aboutClick}, {string:props.settings.strings["log_out"], onClickHandler: logoutClick}]}>
                <LanguageDropDown/>
                <ThemeToggleSwitch/>
              </DropDownList>
            </div>
            :
            <div className="mobileMenuUserContainer">
              <DropDownList items={[{string:props.settings.strings["about"], onClickHandler:aboutClick}]}>
                <LanguageDropDown/>
                <ThemeToggleSwitch/>
              </DropDownList>
            </div>
          }
        </div>

      </div>
    )
  }else{
    return(
      <div className="mobileMenuContainerHidden">
        <button className="mobileMenuToggleButton">
          <MenuIcon onClick={toggleVisibity} className="menuIcon"/>
        </button>
      </div>

    )
  }
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
)(NavMenuMobile)