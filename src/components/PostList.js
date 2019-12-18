// By: Niklas Impiö
import React, {useState} from "react"
import {connect} from "react-redux"

import {logout} from "../reducers/loginReducer"
import {notify} from "../reducers/notificationReducer"

import "../styles/postList.css"





export const PostList = (props) => {
  const [posts, setPosts] = useState(props.posts)
  /*
    ListView main component for the listview that will be placed in the content section of the page.
    Will include PostList component and modified postview component atleast. There might also be inner components for the search and sort
  */

  const getDateFromUnixStamp = (unix) => {
    //returns date in format dd.mm.yyyy
    const date = new Date(unix)
    return `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`
  }

  return (
    <div className="postListContainerInner">
      <div className="searchContainer">
        <form name="searchForm">
          <div className="searchInputContainer">
            <input name="username" className="input" placeholder={props.settings.strings["search"]} maxLength="32" autoComplete="off"/>
            <div className="inputFocusLine"/>
          </div>
        </form>
      </div>
      <div className="filterSortContainer">
        <button className="rippleButton">Filter</button>
        <button className="rippleButton">Sort</button>

      </div>
      <ul className="postListList">
        {posts.map((post,index) =>
          <li key={index} className="postListItem">
            <div className="postListItemImage">

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

const mapStateToProps = (state) => {
  return {
    //maps state to props, after this you can for example call props.notification
    posts: state.posts,
    settings: state.settings
  }
}

const mapDispatchToProps = {
  //connect reducer functions/dispatchs to props
  //notify (for example)
  notify,
  logout
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList)