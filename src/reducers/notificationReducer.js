//import store from "../store"

const initialState = {message: null, error: false, seconds: 0, cancel: null}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case "SET_NOTIFICATION":
    //works, cancels the qued timeout.
    if(state.cancel !== null) {
      clearTimeout(state.cancel)
    }
    return action.data
  case "CANCEL_NOTIFICATION":
    return initialState
  default:
    return state
  }
}



export const notify = (message, error, seconds) => {

  return (dispatch) => {
    //define cancel function and include it in redux state notification, then components can call window.clearTimeout() as long as they can access props.notification

    const cancel = setTimeout(() => {
      dispatch({
        type: "CANCEL_NOTIFICATION",
      })
    },seconds*1000)

    dispatch({
      type: "SET_NOTIFICATION",
      data: {
        message: message,
        error: error,
        seconds: seconds,
        cancel: cancel
      }
    })
  }

}



export const cancelNotification = () => {
  console.log("cancelling notification")
  return (dispatch) => {
    dispatch({
      type: "CANCEL_NOTIFICATION"

    })
  }
}

export default notificationReducer