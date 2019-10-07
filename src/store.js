import {createStore, combineReducers, applyMiddleware} from "../node_modules/redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import notificationReducer from "./reducers/notificationReducer"

//import reducers here


const reducer = combineReducers({
  //combine reducers here
  //user: userReducer (for example)
  notification: notificationReducer

})

//create store
const store = createStore(reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)
//export store
export default store