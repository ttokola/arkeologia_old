import React from "react"
import {connect} from "react-redux"
import {login} from "../reducers/loginReducer"
import {notify} from "../reducers/notificationReducer"
import "../styles/loginForm.css"

export const LoginForm = (props) => {

  const attemptLogin = async (event) => {
    console.log("attempting login")
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    event.target.username.value = ""
    event.target.password.value = ""
    const user = await props.login(username,password, props.notify)
    //init content if login was succesfull.
    if(user){
      //LOG IN
      props.history.push("/")
      console.log("logged in")
    }

  }

  return(
    <div className="loginContainer centerAlign">
      <p className="headerText bottomPadding30">Login</p>

      <form name="loginForm" onSubmit={attemptLogin}>
        <div className="inputContainer">
          <input name="username" className="input" placeholder="User Name" maxLength="32" autoComplete="off"/>
          <div className="inputFocusLine"/>

        </div>
        <div className="inputContainer">
          <input name="password" className="input" type="password" placeholder="Password" maxLength="64"/>
          <div className="inputFocusLine"></div>
        </div>

        <button className="positiveButton rippleButton">Log In</button>
        <button className="negativeButton rippleButton" onClick={() => props.history.push("/")}>Cancel</button>
      </form>
    </div>

  )
}

export default connect(
  null,
  {login, notify}
)(LoginForm)