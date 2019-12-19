// By: Niklas Impiö
import React, {useState} from "react"
import {connect} from "react-redux"

import {logout} from "../reducers/loginReducer"
import {notify} from "../reducers/notificationReducer"


import "../styles.css"
import PostViewLW from "./PostViewLW"



export const ListView = (props) => {
  /*
    ListView main component for the listview that will be placed in the content section of the page.
    Will include PostList component and modified postview component atleast. There might also be inner components for the search and sort
  */

  const onItemClick = (post) => {
    setPost(post)
  }

  const getDateFromUnixStamp = (unix) => {
    //returns date in format dd.mm.yyyy
    const date = new Date(unix)
    return `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`
  }

  const [post, setPost] = useState(props.posts[0])
  const [posts, setPosts] = useState(props.posts)

  return (

    <div className="listViewInnerContainer centerAlign">
      <div className="postListContainer">
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
              <li key={index} className="postListItem" onClick={() => onItemClick(post)}>
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
      </div>

      <div className="postPreviewContainer">
        <PostViewLW post={post} history={props.history}/>
      </div>



    </div>




  )
}

const mapStateToProps = (state) => {
  return {
    //maps state to props, after this you can for example call props.notification
    user: state.user,
    settings: state.settings,
    posts: state.posts
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
)(ListView)