//by Niklas Impiö
import React, {useState, useEffect} from "react"
import {connect} from "react-redux"

import {notify} from "../reducers/notificationReducer"
import {setTempPost} from "../reducers/tempPostReducer"

import "../styles/imageUpload.css"
//inspiration from
//https://codepen.io/hartzis/pen/VvNGZP
export const ImageUpload = (props) => {
  const [image, setImage] = useState(null)
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null)

  useEffect(() => {
    if(props.tempPost.image !== null && props.tempPost.image !== undefined){
      const file = props.tempPost.image
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(file)
        setImagePreviewUrl(reader.result)

      }
      reader.readAsDataURL(file)
    }

  }, [props])

  const handleImageChange = (event) => {
    event.preventDefault()
    const reader = new FileReader()
    const file = event.target.files[0]
    reader.onloadend = () => {
      setImage(file)
      setImagePreviewUrl(reader.result)
      setTempPostImage(file)
    }
    reader.readAsDataURL(file)
  }

  const setTempPostImage = (image) => {
    const temp = {...props.tempPost}
    temp.image = image
    props.setTempPost(temp)
  }



  return(
    <div className="imageUploadContainer">
      <div className="imagePreviewContainer">
        {imagePreviewUrl !== null?
          <img className="previewImage" src={imagePreviewUrl}></img>
          :
          <div className="previewText normalText">No image selected.</div>
        }
      </div>
      <div className="selectImageContainer">

        <label className="rippleButton"> Choose File
          <input type="file" accept="image/*" onChange={handleImageChange}/>
        </label>
        {image !== null?
          <p className="normalText textCenter">{image.name}</p>
          :
          <p className="normalText textCenter">No Image Selected.</p>
        }

        <button className="rippleButton">Access Camera</button>
      </div>
    </div>
  )

}


const mapStateToProps = (state) => {
  return {
    //maps state to props, after this you can for example call props.notification
    user: state.user,
    tempPost: state.tempPost,
    userLocation: state.userLocation
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
)(ImageUpload)