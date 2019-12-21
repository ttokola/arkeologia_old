// By: Niklas Impiö
import React, {useState, useEffect} from "react"
import {connect} from "react-redux"
import {Map, TileLayer, Marker} from "react-leaflet"
import L from "leaflet"
import "../styles/mapContainer.css"
import "leaflet/dist/leaflet.css"

import icon from "../resources/marker-icon.png"
import iconx2 from "../resources/marker-icon-2x.png"
import iconShadow from "../resources/marker-shadow.png"

import userIconMarker from "../resources/user_icon_custom.svg"
import tempIconMarker from "../resources/temp_marker.svg"

import {notify} from "../reducers/notificationReducer"
import {createPost} from "../reducers/postReducer"
import {updateUserLocation} from "../reducers/userLocationReducer"

import {usePosition} from "../hooks/LocationHook"
import {setTempPost} from "../reducers/tempPostReducer"
import {updateMapLocation} from "../reducers/mapLocationReducer"

//setting up the default icon, since the library had some bugs for loading it.
let defaultIcon = L.icon({
  iconRetinaUrl: iconx2,
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconAnchor: [12, 41]
})
L.Marker.prototype.options.icon = defaultIcon

const userIcon = L.icon({
  iconUrl: userIconMarker,
  iconAnchor: [16,16]
})

const tempIcon = L.icon({
  iconUrl: tempIconMarker,
  iconAnchor: [16,32]
})


const MapContainerOpen = (props) => {
  //state variables
  const [position, setPosition] = useState({lat: 65.01157565139543, lng: 25.470943450927738})
  const [tempMarker, setTempMarker] = useState(null)
  const [zoom, setZoom] = useState(13)
  const [posts, setPosts] = useState([])

  //Wheather the map constantly centers to user location. Enabled when user clics their own avatar. Disabled when map manually moved.
  const [followUser, setFollowUser] = useState(true)

  //users custom location hook
  const {userLocation} = usePosition(5)

  //TEMP solution since I don't know how to access redux state from location hook directly
  //updates user state to redux from here, should find a better way, causes extra render.
  if(props.userLocation !== userLocation && userLocation !== null){
    console.log("updating user location to redux state")
    props.updateUserLocation(userLocation)
  }

  useEffect(() => {
    //hook for initializing state variable posts. And sets map position to user location if location access.
    console.log("initing map")
    if(props.posts !== posts){
      setPosts(props.posts)
    }
    if(followUser){
      console.log("centering map to user location")
      setPosition(userLocation)
    }
    if(props.mapLocation !== null){
      console.log("setting map to location")
      setZoom(14)
      setPosition(props.mapLocation)
      props.updateMapLocation(null)
    }
  }, [props, posts])



  const onPostClick = (post) => {
    //event handler for post marker clicks. Routes to post view.
    console.log(`Clicked post: ${post}`, post)
    props.history.push(`/post-view/${post.id}/`)
    setFollowUser(false)
    setPosition(post.location)

  }


  const leftClick = (event) => {
    //unfocus click or logo click doesn't reset TempMarker.
    if(props.history.location.pathname === "/select-location/"){
      setTempMarker(event.latlng)
      setPosition(event.latlng)
    }
  }

  const userClick = () => {
    //when user avatar clicked the map centers to user and followUser is activated.
    if(!followUser){
      console.log("Following User")
      setFollowUser(true)
      props.notify(props.settings.strings["user_follow"], false, 5)
    }
    setPosition(userLocation)
  }

  const dragEvent = (event) => {
    //if followUser is active, disable it.
    if(followUser){
      console.log("Disabling Follow User")
      setFollowUser(false)
    }
    setPosition(event.latlng)

  }

  const rightClick = (event) => {
    setPosition(event.latlng)
  }


  const confirmNewLocationMarker = () => {
    //confirm select on map event handler. Button is visible only when correct url.

    const tempPost = {...props.tempPost}
    tempPost.location = tempMarker
    console.log(tempPost)
    props.setTempPost(tempPost)
    props.history.push("/new-post/")
    setTempMarker(null)
  }

  const toListView = (event) => {
    event.preventDefault()
    console.log("to list view")
    props.history.push("/list-view/")
  }
  const newPostClick = (event) => {
    //New post onClick event handler.

    event.preventDefault()
    if(props.user !== null){
      console.log("Adding new post")
      props.history.push("/new-post/")
    }else{
      //if not logged in, redirect to login page
      props.history.push("/login/")
      props.notify(props.settings.strings["login_required_to_post"], false, 5)
    }

  }

  const scrollListener = (event) => {
    //dunno if needed updates the state for the zoom level.
    console.log(`Setting zoom to ${event.target._zoom}`)
    setZoom(event.target._zoom)
  }
  return(
    <div className="mapContainer">
      <Map className="fullscreenMap" center={position} zoom={zoom} onClick={leftClick} oncontextmenu={rightClick} onZoom={scrollListener} ondrag={dragEvent}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {posts.map((element, index) =>
          <Marker key={index} position={element.location} onClick={() => onPostClick(element)}>
          </Marker>
        )}
        {userLocation !== null?
          <Marker position={userLocation} icon={userIcon} onClick={userClick}>
          </Marker>
          :
          <div/>
        }
        {tempMarker !== null?
          <Marker position={tempMarker} icon={tempIcon}></Marker>
          :
          <div/>
        }
      </Map>
      <button className="overlayButtonLeft rippleButton" onClick={toListView}>{props.settings.strings["list_view"]}</button>
      {props.history.location.pathname !== "/select-location/"?
        <button className="overlayButtonRight rippleButton" onClick={newPostClick}>{props.settings.strings["new_post"]}</button>
        :
        tempMarker === null?
          <button className="overlayButtonRight rippleButton" onClick={newPostClick}>{props.settings.strings["no_location_selected"]}</button>
          :
          <button className="overlayButtonRight pulsingButton rippleButton" onClick={confirmNewLocationMarker}>{props.settings.strings["confirm_location"]}</button>
      }
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    //maps state to props, after this you can for example call props.notification
    userLocation: state.userLocation,
    tempPost: state.tempPost,
    settings: state.settings,
    posts: state.posts,
    user: state.user,
    mapLocation: state.mapLocation

  }
}

const mapDispatchToProps = {
  //connect reducer functions/dispatchs to props
  //notify (for example)
  notify,
  createPost,
  updateUserLocation,
  setTempPost,
  updateMapLocation

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapContainerOpen)