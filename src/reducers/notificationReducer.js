
const initialState = {message: null, error: false}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case "SET_NOTIFICATION":
    return action.data
  case "CANCEL_NOTIFICATION":
    return initialState
  default:
    return state
  }
}


export const notify = (message, error, seconds) => {

  console.log("setting notification:",message)

  if(error){
    //notificationContainer[0].setAttribute("border-color","red")
  }

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
  return (dispatch) => {
    dispatch({
      type: "CANCEL_NOTIFICATION"

    })
  }
}

export default notificationReducer