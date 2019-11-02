// By: Niklas Impiö
import {createStore, combineReducers, applyMiddleware} from "../node_modules/redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import notificationReducer from "./reducers/notificationReducer"
import postReducer from "./reducers/postReducer"
import loginReducer from "./reducers/loginReducer"
import userLocationReducer from "./reducers/userLocationReducer"
import tempPostReducer from "./reducers/tempPostReducer"

//import reducers here


const reducer = combineReducers({
  //combine reducers here
  //user: userReducer (for example)
  notification: notificationReducer,
  posts: postReducer,
  user: loginReducer,
  userLocation: userLocationReducer,
  tempPost: tempPostReducer

})

//create store
const store = createStore(reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)
//export store
export default store