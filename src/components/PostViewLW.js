// By: Niklas Impiö
import React, {useState} from "react"
import {connect} from "react-redux"
import {notify} from "../reducers/notificationReducer"
import {deletePost} from "../reducers/postReducer"
import {updateMapLocation} from "../reducers/mapLocationReducer"

import "../styles.css"


import {ReactComponent as TwitterIcon} from "../resources/twitter_icon.svg"
import {ReactComponent as FacebookIcon} from "../resources/facebook_icon.svg"
import {ReactComponent as InstagramIcon} from "../resources/instagram_icon.svg"


export const PostViewLW = (props) => {
  /*
    Modified Postview to be used as part of listview, gets post as props.
  */
  const [deleteState, setDeleteState] = useState(false)

  const showOnMap = (event) => {
    event.preventDefault()
    console.log(`Centering Map to ${props.post.title} coordinates.`)
    props.updateMapLocation(props.post.location)
    props.history.push("/")
  }
  const deletePost = (event) => {
    event.preventDefault()
    console.log("postView deleting post", props.post.id)
    props.deletePost(props.post.id)
    props.history.push("/")
    props.notify(`${props.settings.strings["post"]}: "${props.post.title}" ${props.settings.strings["delete_success"]}`, false, 5)

  }

  const reportClick = (event) => {
    event.preventDefault()
    props.history.push(`/post-view/${props.post.id}/report/`)
  }

  const getDateFromUnixStamp = (unix) => {
    //returns date in format dd.mm.yyyy
    const date = new Date(unix)
    return `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`
  }

  if(props.post){
    //if post is defined return the actual post view else empty div.

    return(
      <div className="postViewContainerLW">
        <div className="postTitleContainer">
          <h1 className="titleTextAuto">{props.post.title}</h1>
        </div>
        <div className="postImageContainer">
          <img className="postImage" src={props.post.image.data}></img>
        </div>
        <div className="postContextContainer">
          <div className="infoContainer">
            {props.post.author?
              <p className="normalTextNoMargin">{`By: ${props.post.author}`}</p>
              :
              <p className="normalTextNoMargin">{"By: Anonymous User"}</p>
            }
            <p className="normalTextNoMargin">{getDateFromUnixStamp(props.post.date)}</p>
          </div>
          <div className="postButtonsContainer">
            {props.user && (props.user.admin || props.user.username === props.post.author)?
              <button className="rippleButton smallButton negativeButton" onClick={() => setDeleteState(true)}>{props.settings.strings["delete_post"]}</button>
              :
              <div/>

            }
            {props.user !== null?
              <button className="rippleButton smallButton negativeButton" onClick={reportClick}>{props.settings.strings["report"]}</button>
              :
              <div/>
            }
            <TwitterIcon className="mobileIconSmall"/>
            <FacebookIcon className="mobileIconSmall"/>
            <InstagramIcon className="mobileIconSmall"/>
          </div>
        </div>
        <div className="storyContainer">
          <p className="normalText">{props.post.story}</p>
        </div>
        <div className="postCloseContainer">
          {deleteState?
            <button className="rippleButton fillButton bigButton pulsingButton" onClick={deletePost}>{props.settings.strings["confirm_delete"]}</button>
            :
            <button className="rippleButton fillButton bigButton" onClick={showOnMap}>{props.settings.strings["show_on_map"]}</button>
          }
        </div>
      </div>
    )
  }
  return(
    <div/>
  )

}

const mapStateToProps = (state) => {
  return {
    //maps state to props, after this you can for example call props.notification
    user: state.user,
    posts: state.posts,
    settings: state.settings

  }
}

const mapDispatchToProps = {
  //connect reducer functions/dispatchs to props
  //notify (for example)
  notify,
  deletePost,
  updateMapLocation

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostViewLW)