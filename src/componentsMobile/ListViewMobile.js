// By: Niklas Impiö
import React, {useState} from "react"
import {connect} from "react-redux"

import {logout} from "../reducers/loginReducer"
import {notify} from "../reducers/notificationReducer"


import "../styles/listView.css"
import "../styles/postView.css"



import {ReactComponent as AddIcon} from "../resources/add_circle.svg"
import {ReactComponent as MapViewIcon} from "../resources/map_view_icon.svg"



export const ListViewMobile = (props) => {
  /*
    Mobile version of listview component, doesn't include postview, every list entry will
    navigate to relevant postview id via router.
  */
  const [posts, setPosts] = useState(props.posts)

  const onItemClick = (post) => {
    props.history.push(`/post-view/${post.id}`)
  }

  const getDateFromUnixStamp = (unix) => {
    //returns date in format dd.mm.yyyy
    const date = new Date(unix)
    return `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`
  }

  const toMapView = (event) => {
    event.preventDefault()

    props.history.push("/")
  }
  const newPostClick = (event) => {
    //New post onClick event handler.
    event.preventDefault()
    console.log("Adding new post")
    if(props.user !== null){
      console.log("Adding new post")
      props.history.push("/new-post/")
    }else{
      //if not logged in, redirect to login page
      props.history.push("/login/")
      props.notify(props.settings.strings["login_required_to_post"], false, 5)
    }
  }


  return (

    <div className="postListContainerMobile">

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
      <button className="mobileNewButton" onClick={newPostClick}>
        <AddIcon className="mobileIconSecondary"/>
      </button>
      <button className="mobileListViewButton" onClick={toMapView}>
        <MapViewIcon className="mobileIconSecondary"/>
      </button>
    </div>



  )
}

const mapStateToProps = (state) => {
  return {
    //maps state to props, after this you can for example call props.notification
    user: state.user,
    settings: state.settings,
    posts: state.posts,
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
)(ListViewMobile)