// By: Niklas Impiö
import loginService from "../services/login"



//todo comments? notification!
const loginReducer = (state = null, action) => {
  // different action types defined here. returned value will be set as redux state.
  switch(action.type){
  case "LOGIN":
    return action.data
  case "LOGOUT":
    return null
  case "INIT_USER":
    return action.data
  default:
    return state
  }
}

export const login = (username, password, notify) => {
  //async login request to loginService.
  
  //
  return async (dispatch) => {
    try{
      const user = await loginService.login({
        username,
        password
      })
      // if succesfull set user as localstorage value that will be remembered between reloads.
      window.localStorage.setItem("loggedUser", JSON.stringify(user))
      // If we have other services that will use the token with requests we set their tokens here. Like below
      //contentService.setToken(user.token)
      console.log("user set to", user)
      //Dispatch the action and data to the actual reducer (loginReducer)
      dispatch({
        type:"LOGIN",
        data: user
      })
      return user
    }catch(exception){
      //if the loginservice returns error or doesn't answer error is catched and user notified..
      notify("Login Failed", true, 5)
    }
    return null
  }
}

export const logout = (notify) => {
  //remove user from state, localstorage and remove all tokens from services.
  return (dispatch) => {
    console.log("user set to null")
    window.localStorage.removeItem("loggedUser")
    dispatch({
      type: "LOGOUT",
      data: null
    })
    notify("Logout Complete.",false,5)
  }
}

export const initLoggedUser = (user) => {
  //just a way to init logged user from outside the reducer with for example value from localstorage.
  return(dispatch) => {
    dispatch({
      type: "INIT_USER",
      data: user

    })
  }
}

export default loginReducer