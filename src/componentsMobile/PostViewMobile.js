// By: Niklas Impiö
import React from "react"
import {connect} from "react-redux"
import {notify} from "../reducers/notificationReducer"

import "../styles/postView.css"
import "../styles/buttons.css"
import "../styles/texts.css"

import {ReactComponent as ReturnIcon} from "../resources/arrow_back.svg"
import {ReactComponent as TwitterIcon} from "../resources/twitter_icon.svg"
import {ReactComponent as FacebookIcon} from "../resources/facebook_icon.svg"
import {ReactComponent as InstagramIcon} from "../resources/instagram_icon.svg"





export const PostViewMobile = (props) => {
  /*
    Modified Postview to be used as part of listview, gets post as props. 
  */
  const post = props.posts.find(item => "" + item.id === props.match.params.id)
  console.log(post)

  const showOnMap = (event) => {
    //TODO go to map and set position to props.post.location
  }

  const getDateFromUnixStamp = (unix) => {
    //returns date in format dd.mm.yyyy
    const date = new Date(unix)
    return `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`
  }

  if(post){
    //if post is defined return the actual post view else empty div.

    return(
      <div className="postViewContainerMobile">
        <div className="postTitleContainer">
          <button className="mobileButtonContainer">
            <ReturnIcon className="mobileIcon" onClick={() => props.history.goBack()}/>
          </button>
          <div className="postTitleHeader">
            <h1 className="postTitleTextMobile">{post.title}</h1>
          </div>

        </div>
        <div className="postImageContainer">
          <img className="postImage" src={post.image.data}></img>
        </div>
        <div className="postContextContainer">
          <div className="infoContainer">
            {post.author?
              <p className="normalTextNoMargin">{`By: ${post.author}`}</p>
              :
              <p className="normalTextNoMargin">{"By: Anonymous User"}</p>
            }
            <p className="normalTextNoMargin">{getDateFromUnixStamp(post.date)}</p>
          </div>
          <div className="postButtonsContainer">
            {props.user && (props.user.admin || props.user.username === props.post.author)?
              <button className="rippleButton smallButton">{props.settings.strings["delete_post"]}</button>
              :
              <div/>

            }
            <button className="rippleButton smallButton">{props.settings.strings["report"]}</button>
            <TwitterIcon className="mobileIconSmall"/>
            <FacebookIcon className="mobileIconSmall"/>
            <InstagramIcon className="mobileIconSmall"/>
          </div>
        </div>
        <div className="storyContainer">
          <p className="normalText">{post.story}</p>
        </div>
        <div className="postCloseContainer">
          <button className="rippleButton fillButton bigButton" onClick={showOnMap}>{props.settings.strings["show_on_map"]}</button>
        </div>
      </div>
    )
  }
  return(
    <div className="noPost"/>
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

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostViewMobile)