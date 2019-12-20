import React from "react"
import {connect} from "react-redux"

import {notify} from "../reducers/notificationReducer"
import "../styles.css"

export const UserSettings = (props) => {

  /*

  */




  return(
    <div className="signUpContainer centerAlignWithPadding">
      <div className="signUpTitleContainer">
        <h1 className="titleText">{props.settings.strings["sign_up"]}</h1>
      </div>
      <div className="signUpContainerInner">

        <form className="signUpForm" onSubmit={signUpClick}>
          <div className="signUpInputsContainer">
            <div className="inputContainer">
              <input name="firstName" className="input" placeholder={props.settings.strings["first_name"]} maxLength="32"/>
              <div className="inputFocusLine"/>
            </div>

            <div className="inputContainer">
              <input name="lastName" className="input" placeholder={props.settings.strings["last_name"]} maxLength="32"/>
              <div className="inputFocusLine"/>
            </div>

            <div className="inputContainer">
              <input name="dob" type="date" className="input" placeholder={props.settings.strings["dob"]} maxLength="32"/>
              <div className="inputFocusLine"/>
            </div>

            <div className="inputContainer">
              <input type="email" name="email" className="input" placeholder={props.settings.strings["email"]} maxLength="32"/>
              <div className="inputFocusLine"/>
            </div>
          </div>

          <div>
            <div className="inputContainer">
              <input name="username" className="input" placeholder={props.settings.strings["user_name"]} maxLength="32"/>
              <div className="inputFocusLine"/>
            </div>

            <div className="inputContainer">
              <input name="password" className="input" type="password" placeholder={props.settings.strings["password"]} maxLength="64"/>
              <div className="inputFocusLine"></div>
            </div>

            <div className="inputContainer">
              <input name="password2" className="input" type="password" placeholder={`${props.settings.strings["confirm"]} ${props.settings.strings["password"]}`} maxLength="64"/>
              <div className="inputFocusLine"></div>
            </div>

            <div className="inputContainer">
              <input name="tos_check" type="checkbox"/>
              {props.settings.strings["tos_checkbox_text"]}
            </div>

          </div>
          <div className="postFormButtonContainer">
            <button className="positiveButton rippleButton fillButton">{props.settings.strings["sign_up"]}</button>
            <button className="negativeButton rippleButton fillButton" onClick={() => props.history.push("/")}>{props.settings.strings["cancel"]}</button>
          </div>
        </form>



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
)(UserSettings)