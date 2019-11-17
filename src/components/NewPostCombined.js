// By: Niklas Impiö
import React, {useState, useEffect} from "react"
import {connect} from "react-redux"

import "../styles/newPost.css"
import "../styles/buttons.css"
import {createPost} from "../reducers/postReducer"
import {notify} from "../reducers/notificationReducer"
import {setTempPost} from "../reducers/tempPostReducer"
import ImageUpload from "./ImageUpload"

//combined new post where everything is in a single window. Toggle buttons for which location selection method chosen.
// aka if "live location" button is highlighted the it uses your current location. if map button highlighted then it uses selected location.

export const NewPostCombined = (props) => {
  const [useLiveLocation, setUseLiveLocation] = useState(true)
  const [titleField, setTitleField] = useState("")
  const [storyField, setStoryField] = useState("")
  const [image, setImage] = useState(null)
  const [location, setLocation] = useState(props.userLocation)

  useEffect(() => {
    if(props.tempPost.useLive !== undefined){
      setUseLiveLocation(props.tempPost.useLive)
    }
    if(useLiveLocation && props.tempPost.useLive !== false){
      setLocation(props.userLocation)
    }else{
      setLocation(props.tempPost.location)
    }
    setTitleField(props.tempPost.title)
    setStoryField(props.tempPost.story)
    console.log(props.tempPost.image)
    setImage(props.tempPost.image)

  }, [props])



  const useLiveLocationClick = (event) => {
    event.preventDefault()
    if(props.userLocation === null){
      props.notify("You need to allow location access to use your live location.")
    }else{
      setLocation(props.userLocation)
    }
  }


  const cancelClick = (event) => {
    event.preventDefault()
    props.history.push("/")
    setStoryField("")
    setTitleField("")
    setLocation(null)
    setImage(null)
    props.setTempPost({"title": "", "story":"", "location":null, "image": null, "useLive": true})


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

      return
    }
    if(image === null && props.tempPost.image === null){
      props.notify("Post needs a valid image.", true, 5)
      return
    }
    console.log(image)
    //REMOVE DATE LATER, DONE IN BACKEND.
    if(props.user){
      props.createPost({author:props.user.username, title:titleField, story:storyField, image:image, location:location, date: new Date().getTime()})
    }else{
      props.createPost({author:null, title:titleField, story:storyField, image:image, location:location, date: new Date().getTime()})
    }

    props.notify(`Post "${titleField}" created.`, false, 5)
    setStoryField("")
    setTitleField("")
    setLocation(null)
    setImage(null)
    props.setTempPost({"title": "", "story":"", "location":null, "image": null, "useLive": true})

    props.history.push("/")


  }

  const selectOnMap = (event) => {
    //save already filled value to redux state, while the user selects the location on map
    //show the map and notify the user with instructions.
    event.preventDefault()
    props.setTempPost({"title": titleField, "story":storyField, "location":location, "image": image, "useLive": false})
    props.history.push("/select-location/")
    props.notify("Click on the map to choose a location for the post.", false, 10)
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
    <div className="newPostContainer centerAlign">
      <p className="headerText">{props.settings.strings["new_post"]}</p>
      {useLiveLocation?
        <div className="newPostTabSwitchContainer">
          <button className="rippleButton positiveButton fillButton" onClick={useLiveLocationClick}>{props.settings.strings["use_your_current_location"]}</button>
          <button className="rippleButton negativeButton fillButton" onClick={selectOnMap}>{props.settings.strings["choose_on_map"]}</button>
        </div>
        :
        <div className="newPostTabSwitchContainer">
          <button className="rippleButton negativeButton fillButton" onClick={useLiveLocationClick}>{props.settings.strings["use_your_current_location"]}</button>
          <button className="rippleButton positiveButton fillButton" onClick={selectOnMap}>{props.settings.strings["re_choose_on_map"]}</button>
        </div>
      }
      {location && useLiveLocation?
        <p className="normalText textCenter">{`{ ${props.settings.strings["using_your_current_location"]} ${location.lat}, ${location.lng} }`}</p>
        :
        <div/>
      }
      {location && !useLiveLocation?
        <p className="normalText textCenter">{`{ ${props.settings.strings["using_selected_location"]} ${location.lat}, ${location.lng} }`}</p>
        :
        <div/>
      }

      <ImageUpload/>
      <form className="postForm" onSubmit={confirmPost}>
        <div className="inputContainer">
          <input name="title" id="titleField" className="input" placeholder={props.settings.strings["title"]} maxLength="32" autoComplete="off" onChange={TitleFieldChangeHandler} value={titleField}/>
          <div className="inputFocusLine"/>
        </div>
        <div className="inputContainer">
          <textarea name="story" id="storyField" className="input" rows="4" placeholder={props.settings.strings["description"]} maxLength="256" autoComplete="off" onChange={StoryFieldChangeHandler} value={storyField}/>
          <div className="inputFocusLine"/>
        </div>

        <div className="postFormButtonContainer">
          <button className="rippleButton negativeButton fillButton" onClick={cancelClick}>{props.settings.strings["cancel"]}</button>
          <button className="rippleButton positiveButton fillButton">{props.settings.strings["submit"]}</button>
        </div>
      </form>
    </div>
  )

}

const mapStateToProps = (state) => {
  return {
    //maps state to props, after this you can for example call props.notification
    user: state.user,
    tempPost: state.tempPost,
    userLocation: state.userLocation,
    settings: state.settings
  }
}

const mapDispatchToProps = {
  //connect reducer functions/dispatchs to props
  notify,
  createPost,
  setTempPost
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPostCombined)