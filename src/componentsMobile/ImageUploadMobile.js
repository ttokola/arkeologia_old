//by Niklas Impiö
import React, {useState, useEffect} from "react"
import {connect} from "react-redux"

import {notify} from "../reducers/notificationReducer"
import {setTempPost} from "../reducers/tempPostReducer"

import "../styles/imageUpload.css"

//inspiration from
//https://codepen.io/hartzis/pen/VvNGZP
export const ImageUploadMobile = (props) => {
  //Initial component image uploading and previewing. Might add drag-and-drop later.
  const [image, setImage] = useState(null)
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null)

  useEffect(() => {
    //hook for getting already filled fields from temp post if for example closed the pop up to choose new location on map.
    if(props.tempPost.image !== null && props.tempPost.image !== undefined){
      const file = props.tempPost.image.file
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(file)
        setImagePreviewUrl(reader.result)

      }
      reader.readAsDataURL(file)
    }

  }, [props])

  const handleImageChange = (event) => {
    //loads preview image
    event.preventDefault()
    const reader = new FileReader()
    const file = event.target.files[0]
    reader.onloadend = () => {
      setImage(file)
      let result = reader.result
      setImagePreviewUrl(result)
      setTempPostImage({file:file, data:reader.result})
    }
    reader.readAsDataURL(file)
  }

  const setTempPostImage = (image) => {
    //update image to temp post
    const temp = {...props.tempPost}
    temp.image = image
    props.setTempPost(temp)
  }



  return(
    <div className="imageUploadContainerMobile">
      <div className="imagePreviewContainerMobile">
        {imagePreviewUrl !== null?
          <img className="previewImageMobile" src={imagePreviewUrl}></img>
          :
          <div className="previewText normalText">{props.settings.strings["no_image_selected"]}</div>
        }
      </div>
      <div className="selectImageContainer">
        <div className="dualButtonContainer">
          <label className="rippleButton fillButton"> {props.settings.strings["choose_file"]}
            <input type="file" accept="image/*" onChange={handleImageChange}/>
          </label>
          <button className="rippleButton fillButton">{props.settings.strings["access_camera"]}</button>
        </div>

      </div>
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
  setTempPost
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageUploadMobile)