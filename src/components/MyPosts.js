// By: Niklas Impiö
import React from "react"
import {connect} from "react-redux"
import {notify} from "../reducers/notificationReducer"

import "../styles/myPosts.css"
import "../styles/buttons.css"
import "../styles/texts.css"






export const MyPosts = (props) => {
  /*
  Component that shows list of all components by the current user.
  Clicking a post in the list redirects to the post page.
  Out of focus click closes the pop up.
  */

  console.log(props)
  const posts = props.posts.filter(post => post.author === props.user.username)

  const getDateFromUnixStamp = (unix) => {
    //returns date in format dd.mm.yyyy
    const date = new Date(unix)
    return `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`
  }


  const onPostClick = (post) => {
    //event handler for post marker clicks. Routes to post view.
    console.log(`Clicked post: ${post}`, post)
    props.history.push(`/post-view/${post.id}/`)
  }
  if(posts){
    //if user has posts render the lsit

    return(
      <div className="myPostsContainer centerAlignWithPadding">
        <p className="headerText">{props.settings.strings["my_posts"]}</p>
        <ul className="myPostsList">
          {posts.map((post,index) =>
            <li key={index} className="myPostsListItem" onClick={() => onPostClick(post)}>
              <div className="postListItemImageContainer">
                <img className="postListImagePreview" src={post.image.data}></img>
              </div>
              <div className="postListItemInfo">
                <h2 className="postListTitle">{post.title}</h2>
                <p className="postListText">{post.author}</p>
                <p className="postListText">{getDateFromUnixStamp(post.date)}</p>
              </div>
            </li>
          )}
        </ul>
      </div>
    )
  }
  //if user doesn't have any posts, tell them
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

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPosts)