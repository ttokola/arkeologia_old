import loginService from "../services/login"



//todo comments? notification!
const loginReducer = (state = null, action) => {
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
  return async (dispatch) => {
    try{
      const user = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem("loggedUser", JSON.stringify(user))
      //commentService.setToken(user.token)
      //contentService.setToken(user.token)
      console.log("user set to", user)
      dispatch({
        type:"LOGIN",
        data: user
      })
      return user
    }catch(exception){
      notify("Login Failed", true, 5)
    }
    return null
  }
}

export const logout = (notify) => {
  return async (dispatch) => {
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
  return(dispatch) => {
    dispatch({
      type: "INIT_USER",
      data: user

    })
  }
}

export default loginReducer