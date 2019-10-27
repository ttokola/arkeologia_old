// By: Niklas Impiö
const initialState = {}

const userLocationReducer = (state = initialState, action) => {
  switch(action.type){
  case "INIT_USER_LOCATION":
    return action.data
  case "SET_USER_LOCATION":
    return action.data
  default:
    return state
  }

}

export const updateUserLocation = (location) => {
  return (dispatch) => {
    dispatch({
      type: "SET_USER_LOCATION",
      data: location
    })
  }
}

export default userLocationReducer