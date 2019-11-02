// By: Niklas Impiö
import React from "react"
import {connect} from "react-redux"
import {notify} from "../reducers/notificationReducer"

import "../styles/postView.css"
import "../styles/buttons.css"
import "../styles/texts.css"



//probably make individual css files for all you use here.

export const PostView = (props) => {

  //TEMP
  const post = props.posts.find(item => "" + item.id === props.match.params.id)

  const getDateFromUnixStamp = (unix) => {
    const date = new Date(unix)
    return `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`
  }

  const closeClick = (event) => {
    event.preventDefault()
    console.log("closeClick")
    props.history.goBack()
  }
  console.log(props)
  if(post){

    return(
      <div className="postViewContainer centerAlign">
        <p className="headerText">{post.title}</p>
        <div className="postImageContainer">
          <div className="placeholderImage"></div>
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
            {props.user && (props.user.admin || props.user.username === post.author)?
              <button className="rippleButton smallButton">Delete Post</button>
              :
              <div/>

            }
            <button className="rippleButton smallButton" >Report</button>
            <button className="rippleButton smallButton">Twit</button>
            <button className="rippleButton smallButton">Fb</button>
            <button className="rippleButton smallButton">Insta</button>
          </div>
        </div>
        <div className="storyContainer">
          <p className="normalText">{post.story}</p>

        </div>
        <div className="postCloseContainer">
          <button className="rippleButton fillButton bigButton" onClick={closeClick}>Close</button>
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
    posts: state.posts

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
)(PostView)