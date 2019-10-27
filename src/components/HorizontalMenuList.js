// By: Niklas Impiö
import React from "react"
import {connect} from "react-redux"
import {logout} from "../reducers/loginReducer"
import {notify} from "../reducers/notificationReducer"

import "../styles/horizontalMenuList.css"
import useComponentVisible from "../hooks/OutsideClick"

import DropDownList from "./DropDownList"
import {ReactComponent as DropDownIcon} from "../resources/arrow_drop_down-24px.svg"



const HorizontalMenuList = (props) => {
  const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(false)

  const toggleDDV = () => {
    //DDV = dropDownVisibility
    //event.preventDefault()
    console.log("toggling dropdown visibility")
    setIsComponentVisible(!isComponentVisible)
  }

  const aboutClick = (event) => {
    event.preventDefault()
    props.history.push("/about")
    if(isComponentVisible){
      toggleDDV()
    }
  }
  const projectInfoClick = (event) => {
    event.preventDefault()
    props.history.push("/project-info")
    if(isComponentVisible){
      toggleDDV()
    }
  }

  const logoutClick = (event) => {
    event.preventDefault()
    console.log("Logging out")
    props.logout(props.notify)
    toggleDDV()
  }
  const toLoginClick = (event) => {
    event.preventDefault()
    props.history.push("/login")

  }

  const toSignUp = (event) => {
    event.preventDefault()
    props.history.push("/sign-up")
  }

  //kind of works, but since the ref is on the top level, pressing other menu buttons doesn't close the open dropdown. now it does! added stuff to their event handlers
  //but this way the dropdown list component is within the ref but outside the list.
  return(
    <div className="horizontalMenuContainer" ref={ref}>
      <ul className="menuButtonList">

        {props.user?
          <div className="">
            {isComponentVisible?
              <li className="accountItemActive" onClick={toggleDDV}>
                <span className="accountItemText">{props.user.username}</span>
                <DropDownIcon className="dropDownIconActive"/>
              </li>

              :
              <li className="accountItem" onClick={toggleDDV}>
                <span className="accountItemText">{props.user.username}</span>
                <DropDownIcon className="dropDownIcon"/>
              </li>
            }
          </div>



          :
          <div>
            <li className="menuListItem" onClick={toLoginClick}>
              <p className="menuItemText">Log In</p>
            </li>
            <li className="menuListItem" onClick={toSignUp}>
              <p className="menuItemText">Sign Up</p>
            </li>
          </div>

        }


        <li name="" className="menuListItem" onClick={aboutClick}>
          <p name="" className="menuItemText">About</p>
        </li>
        <li name="" className="menuListItem" onClick={projectInfoClick}>
          <p name="" className="menuItemText">Project Info</p>
        </li>
      </ul>
      {isComponentVisible?
        <div className="accountDropDownContainer">
          <DropDownList  items={[{text:"Account Activity", onClickHandler: null}, {text:"Configure Account", onClickHandler: null}, {text:"Logout", onClickHandler: logoutClick}]}/>
        </div>
        :
        <div/>
      }

    </div>
  )

}

const mapStateToProps = (state) => {
  return {
    //maps state to props, after this you can for example call props.user
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
)(HorizontalMenuList)