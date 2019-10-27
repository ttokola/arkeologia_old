// By: Niklas Impiö
import React, {useState} from "react"
import {connect} from "react-redux"
import "../styles/mapPost.css"
import "../styles/buttons.css"
import "../styles/texts.css"

import {createPost} from "../reducers/postReducer"
import {notify} from "../reducers/notificationReducer"

export const MapPost = (props) => {
  const [titleField, setTitleField] = useState("")
  const [storyField, setStoryField] = useState("")
  const [location, setLocation] = useState(null)
  //const storyField = document.getElementsByClassName("input")[1]



  const cancelClick = (event) => {
    event.preventDefault()
    props.history.push("/")

  }

  const confirmPost = (event) => {
    event.preventDefault()
    console.log("creating new post")

    if(titleField.length < 5){
      props.notify("Minimum Title Length is 5 characters.", true, 5)
      return
    }
    if(location === null){
      props.notify("Post needs a valid location.", true, 5)
      props.history.push("/")
    }
    if(props.userLocation !== null){
      props.createPost({author:props.user, title:titleField, story:storyField, image:null, location:location})

      props.notify(`Post "${titleField}" created.`, false, 5)
      props.history.push("/")
    }else{
      props.notify("Live Post needs access to your location.", true, 5)
    }

  }

  const TitleFieldChangeHandler = (event) => {
    event.preventDefault()
    setTitleField(event.target.value)
  }
  const StoryFieldChangeHandler = (event) => {
    event.preventDefault()
    setStoryField(event.target.value)
    //event.target.setAttribute("rows", parseInt((storyField.content.scrollHeight) / 18))
  }

  return(
    <div className="mapPostContainer">
      {location?
        <div>
          <p className="normalText">Currently selected Location: {`[ ${location.lat}, ${location.lng} ]`}</p>
          <button className="rippleButton fillButton">Re-Select Location</button>
        </div>
        :
        <div>
          <button className="rippleButton fillButton">Select Location</button>
        </div>

      }
      <div className="imageInputContainer">
        <button className="rippleButton fillButton">Access Camera</button>
        <button className="rippleButton fillButton">Access Gallery</button>
      </div>
      <form className="postForm" onSubmit={confirmPost}>



        <div className="primaryBackground inputContainer">
          <input name="title" id="titleField" className="primaryBackground input" placeholder="Title" maxLength="32" autoComplete="off" onChange={TitleFieldChangeHandler}/>
          <div className="inputFocusLine"/>
        </div>
        <div className="primaryBackground inputContainer">
          <textarea name="story" id="storyField" className="primaryBackground input" rows="4" placeholder="Desciption/Story" maxLength="256" autoComplete="off" onChange={StoryFieldChangeHandler}/>
          <div className="inputFocusLine"/>
        </div>

        <div className="postFormButtonContainer">
          <button className="rippleButton negativeButton fillButton" onClick={cancelClick}>Cancel</button>
          <button className="rippleButton positiveButton fillButton">Submit</button>
        </div>


      </form>
    </div>
  )

}

const mapStateToProps = (state) => {
  return {
    //maps state to props, after this you can for example call props.notification
    user: state.user,
    userLocation: state.userLocation

  }
}

const mapDispatchToProps = {
  //connect reducer functions/dispatchs to props
  //notify (for example)
  notify,
  createPost
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapPost)

