import React from "react"
import {connect} from "react-redux"

import {notify} from "../reducers/notificationReducer"
import "../styles.css"

export const SignUp = (props) => {

  /*
  Sign up component
  has two sections:
  1. the form to fill all necessary details before signing up.
  2. Scrollable text box containing the terms of service.
  */
  const signUpClick = (event) => {
    //check Values locally, if ok send to backend, otherwise notify.
    //TODO


  }

  const checkValues = (firstName, lastName, email, dob, username, password) => {
    //return true if all values ok.
    //else return false.
    //
    //TODO

  }


  return(
    <div className="signUpContainer centerAlignWithPadding">
      <div className="signUpTitleContainer">
        <h1 className="titleText">{props.settings.strings["sign_up"]}</h1>
      </div>
      <div className="signUpContainerInner">
        <div className="signUpForm">
          <form>

            <div className="inputContainerPrimary">
              <input name="firstName" className="inputPrimary" placeholder={props.settings.strings["first_name"]} maxLength="32"/>
              <div className="inputFocusLine"/>
            </div>

            <div className="inputContainerPrimary">
              <input name="lastName" className="inputPrimary" placeholder={props.settings.strings["last_name"]} maxLength="32"/>
              <div className="inputFocusLine"/>
            </div>

            <div className="inputContainerPrimary">
              <input name="dob" type="date" className="inputPrimary" placeholder={props.settings.strings["dob"]} maxLength="32"/>
              <div className="inputFocusLine"/>
            </div>

            <div className="inputContainerPrimary">
              <input type="email" name="email" className="inputPrimary" placeholder={props.settings.strings["email"]} maxLength="32"/>
              <div className="inputFocusLine"/>
            </div>

            <div className="inputContainerPrimary">
              <input name="username" className="inputPrimary" placeholder={props.settings.strings["user_name"]} maxLength="32"/>
              <div className="inputFocusLine"/>
            </div>

            <div className="inputContainerPrimary">
              <input name="password" className="inputPrimary" type="password" placeholder={props.settings.strings["password"]} maxLength="64"/>
              <div className="inputFocusLine"></div>
            </div>

            <div className="inputContainerPrimary">
              <input name="tos_check" type="checkbox"/>
              {props.settings.strings["tos_checkbox_text"]}
            </div>

            <button type="submit" className="positiveButton rippleButton">{props.settings.strings["sign_up"]}</button>
            <button className="negativeButton rippleButton" onClick={() => props.history.push("/")}>{props.settings.strings["cancel"]}</button>
          </form>

        </div>

        <div className="signUpTerms">
          <div className="termsContainer">
            <h2 className="titleText">{props.settings.strings["tos_title"]}</h2>
            <p className="normalText">{props.settings.strings["tos_text"]}</p>
          </div>


        </div>
      </div>
    </div>

  )
}
const mapStateToProps = (state) => {
  return {
    //maps state to props, after this you can for example call props.notification
    settings: state.settings
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
)(SignUp)