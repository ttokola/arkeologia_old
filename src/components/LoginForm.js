import React from "react"
import {connect} from "react-redux"
import {login} from "../reducers/loginReducer"
import {notify} from "../reducers/notificationReducer"
import "../styles/loginForm.css"

export const LoginForm = (props) => {
  //TEMP COMPONENT, might be replaced or expanded later.

  const attemptLogin = async (event) => {
    console.log("attempting login")
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    event.target.username.value = ""
    event.target.password.value = ""
    const user = await props.login(username, password, props.notify)
    console.log(user)
    //init content if login was succesfull.
    if(user){
      //LOG IN
      props.history.push("/")
      console.log("logged in")
    }

  }

  return(
    <div className="loginContainer centerAlign">
      <p className="headerText bottomPadding30">{props.settings.strings["log_in"]}</p>

      <form name="loginForm" onSubmit={attemptLogin}>
        <div className="inputContainer">
          <input name="username" className="input" placeholder={props.settings.strings["user_name"]} maxLength="32" autoComplete="off"/>
          <div className="inputFocusLine"/>
        </div>

        <div className="inputContainer">
          <input name="password" className="input" type="password" placeholder={props.settings.strings["password"]} maxLength="64"/>
          <div className="inputFocusLine"></div>
        </div>

        <button type="submit" className="positiveButton rippleButton">{props.settings.strings["log_in"]}</button>
        <button className="negativeButton rippleButton" onClick={() => props.history.push("/")}>{props.settings.strings["cancel"]}</button>
      </form>

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
  login,
  notify
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm)