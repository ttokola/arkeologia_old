// By: Niklas Impiö
import React, {useState} from "react"
import {connect} from "react-redux"
import {notify} from "../reducers/notificationReducer"


import "../styles.css"




export const AdminView = (props) => {

  //TODO change after reporting implemented.
  //TODO switch to string storage!!!
  const posts = props.posts

  const getDateFromUnixStamp = (unix) => {
    //returns date in format dd.mm.yyyy
    const date = new Date(unix)
    return `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`
  }

  const onItemClick = (post) => {
    props.history.push(`/post-view/${post.id}/`)
  }

  return(
    <div className="adminViewContainer">

      <div className="adminHeaderContainer">
        <h1 className="headerText">Project Name Admin Panel</h1>
        <button className="rippleButton">Download Project Data</button>
      </div>

      <div className="reportedPostsListContainer">
        <h1 className="headerText">Reported Posts</h1>
        <ul className="postListListAdmin">
          {posts.map((post,index) =>
            <li key={index} className="postListItem" onClick={() => onItemClick(post)}>
              <div className="postListItemImageContainer">
                <img className="postListImagePreview" src={post.image.data}></img>
              </div>
              <div className="postListItemInfo">
                <h2 className="postListTitle">{post.title}</h2>
                <p className="postListText">{post.author}</p>
                <p className="postListText">{getDateFromUnixStamp(post.date)}</p>
              </div>
              <div className="postListReportFlags">
                <p className="postListText">Reports: 5</p>
                <p className="postListText">{props.settings.strings["NSFW_content"]}: #</p>
                <p className="postListText">{props.settings.strings["profanity"]}: #</p>
                <p className="postListText">{props.settings.strings["offensive_language"]}: #</p>
                <p className="postListText">{props.settings.strings["off_topic_content"]}: #</p>
                <p className="postListText">{props.settings.strings["other"]}: #</p>

              </div>
            </li>
          )}
        </ul>


      </div>
      <div className="projectStatsContainer">
        <h1 className="headerText">Project Statistics</h1>

      </div>

      <div className="configureProjectContainer">
        <h1 className="headerText">Configure Project</h1>

      </div>


    </div>
  )

}

const mapStateToProps = (state) => {
  return {
    //maps state to props, after this you can for example call props.notification
    settings: state.settings,
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
)(AdminView)