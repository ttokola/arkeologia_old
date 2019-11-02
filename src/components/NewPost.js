// By: Niklas Impiö
import React, {useState} from "react"
import {Route} from "react-router-dom"
import "../styles/newPost.css"
import "../styles/buttons.css"
import LivePost from "./LivePost"
import MapPost from "./MapPost"


//probably make individual css files for all you use here.

export const NewPost = (props) => {
  const [liveTabSelected, setLiveTabSelected] = useState(true)


  const toggleTab = (event) => {
    event.preventDefault()
    setLiveTabSelected(!liveTabSelected)
    if(liveTabSelected){
      props.history.push("/new-post/gallery")
    }else{
      props.history.push("/new-post/live")
    }
  }

  return(
    <div className="newPostContainer centerAlign">
      <p className="headerText">New POST</p>
      {liveTabSelected?
        <div className="newPostTabSwitchContainer">
          <button className="rippleButton positiveButton fillButton">Live</button>
          <button className="rippleButton negativeButton fillButton" onClick={toggleTab}>Gallery</button>
        </div>
        :
        <div className="newPostTabSwitchContainer">
          <button className="rippleButton negativeButton fillButton" onClick={toggleTab}>Live</button>
          <button className="rippleButton positiveButton fillButton" >Gallery</button>
        </div>
      }

      <Route path="/new-post/live/" render={({history}) => (
        <LivePost history={props.history}/>
      )}/>
      <Route path="/new-post/gallery/" render={({history}) => (
        <MapPost history={props.history}/>
      )}/>

    </div>
  )
  /*
  if(liveTabSelected){
    console.log("rendering livetab")
    return(
      <div className="newPostContainer centerAlign">
        <p className="headerText">New POST</p>

        <div className="newPostTabSwitchContainer">
          <button className="rippleButton positiveButton fillButton">Live</button>
          <button className="rippleButton negativeButton fillButton" onClick={toggleTab}>Gallery</button>
        </div>
        <LivePost history={props.history}/>

      </div>

    )
  }else{
    console.log("rendering galleryTab")
    return(
      <div className="newPostContainer centerAlign">
        <p className="headerText">New POST</p>

        <div className="newPostTabSwitchContainer">
          <button className="rippleButton negativeButton fillButton" onClick={toggleTab}>Live</button>
          <button className="rippleButton positiveButton fillButton" >Gallery</button>
        </div>
        <MapPost history={props.history}/>


      </div>

    )

  }
*/

}

export default NewPost