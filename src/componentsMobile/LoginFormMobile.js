import React, {useState} from "react"
import {connect} from "react-redux"
import {login} from "../reducers/loginReducer"
import {notify} from "../reducers/notificationReducer"
import "../styles/loginForm.css"


import {ReactComponent as ReturnIcon} from "../resources/arrow_back.svg"

export const LoginFormMobile = (props) => {
  const [forgotState, setForgotState] = useState(false)

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

  const recoverPassword = async (event) => {
    //TODO
  }

  const toSignUp = (event) => {
    event.preventDefault()
    props.history.push("/sign-up")
  }
  const forgotClick = (event) => {
    event.preventDefault()
    setForgotState(!forgotState)
  }
  if(forgotState){

    return(
      <div className="loginContainerMobile">
        

        <form className="loginForm loginFormMobile" name="loginForm" onSubmit={recoverPassword}>
          <div className="mainContent">
            <div className="titleContainerMobile">
              <button className="mobileButtonContainer">
                <ReturnIcon className="mobileIcon" onClick={(event) => {event.preventDefault(); props.history.goBack()}}/>
              </button>
              <div className="titleHeaderMobile">
                <h1 className="titleTextMobile">{props.settings.strings["password_recovery"]}</h1>
              </div>

            </div>
            <div className="inputContainer">
              <input name="username" className="input" placeholder={props.settings.strings["email"]} maxLength="32" autoComplete="off"/>
              <div className="inputFocusLine"/>
            </div>
          </div>
          


          <div className="buttonContainerMobile">
            <button className="negativeButton rippleButton fillButton" onClick={forgotClick}>{props.settings.strings["cancel"]}</button>
            <button type="submit" className="positiveButton rippleButton fillButton">{props.settings.strings["confirm"]}</button>
          </div>
        </form>

      </div>


    )
  }
  return(
    <div className="loginContainerMobile">


      <form className="loginForm loginFormMobile" name="loginForm" onSubmit={attemptLogin}>

        <div className="inputFields">
          <div className="titleContainerMobile">
            <button className="mobileButtonContainer">
              <ReturnIcon className="mobileIcon" onClick={(event) => {event.preventDefault(); props.history.goBack()}}/>
            </button>
            <div className="titleHeaderMobile">
              <h1 className="titleTextMobile">{props.settings.strings["log_in"]}</h1>
            </div>

          </div>
          <div className="inputContainer">
            <input name="username" className="input" placeholder={props.settings.strings["email"]} maxLength="32" autoComplete="off"/>
            <div className="inputFocusLine"/>
          </div>

          <div className="inputContainer">
            <input name="password" className="input" type="password" placeholder={props.settings.strings["password"]} maxLength="64"/>
            <div className="inputFocusLine"></div>
          </div>
          <p className="linkText" onClick={forgotClick}>{props.settings.strings["forgot_password"]}</p>
          <p className="linkText" onClick={toSignUp}>{props.settings.strings["create_account"]}</p>
        </div>

        <div className="buttonContainerMobile">
          <button className="negativeButton rippleButton fillButton" onClick={() => props.history.push("/")}>{props.settings.strings["cancel"]}</button>
          <button type="submit" className="positiveButton rippleButton fillButton">{props.settings.strings["log_in"]}</button>
        </div>
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
)(LoginFormMobile)