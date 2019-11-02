// By: Niklas Impiö
import React, {useState, useEffect} from "react"
import {connect} from "react-redux"
import {Map, TileLayer, Marker, Popup} from "react-leaflet"
import L from "leaflet"
import "../styles/mapContainer.css"
import "leaflet/dist/leaflet.css"

import icon from "../resources/marker-icon.png"
import iconx2 from "../resources/marker-icon-2x.png"
import iconShadow from "../resources/marker-shadow.png"

import userIconMarker from "../resources/user_icon_custom.svg"

import {notify} from "../reducers/notificationReducer"
import {createPost} from "../reducers/postReducer"
import {updateUserLocation} from "../reducers/userLocationReducer"

import {usePosition} from "../hooks/LocationHook"
import {setTempPost} from "../reducers/tempPostReducer"


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

//ADDING NEW POST DOESN'T UPDATE WITHOUT RELOAD!!!
const MapContainerOpen = (props) => {
  //props has array of posts at props.posts
  const [position, setPosition] = useState({lat: 65.01157565139543, lng: 25.470943450927738})
  const [zoom, setZoom] = useState(13)
  const [posts, setPosts] = useState([])

  //users custom location hook
  const {userLocation} = usePosition(5)

  //TEMP solution since I don't know how to access redux state from location hook directly
  if(props.userLocation !== userLocation && userLocation !== null){
    console.log("updating user location to redux state")
    props.updateUserLocation(userLocation)
  }

  useEffect(() => {
    console.log("initing map")
    if(props.posts !== posts){
      setPosts(props.posts)
    }
    if(userLocation){
      console.log("centering map to user location")
      setPosition(userLocation)
    }
  }, [props, posts])



  const onPostClick = (post) => {

    console.log(`Clicked post: ${post}`, post)
    //maybe use router to change url to post/id and that triggers post view pop up render.
    props.history.push(`/post-view/${post.id}/`)
  }


  const rightClick = (event) => {
    console.log("right click at ", event.latlng)

    if(props.history.location.pathname === "/select-location/"){
      const tempPost = {...props.tempPost}
      tempPost.location = event.latlng
      console.log(tempPost)
      props.setTempPost(tempPost)
      props.history.push("/new-post/")
    }
    setPosition(event.latlng)
  }


  const newPostClick = (event) => {
    event.preventDefault()
    console.log("Adding new post")
    props.history.push("/new-post/")
  }

  const scrollListener = (event) => {
    console.log(`Setting zoom to ${event.target._zoom}`)
    setZoom(event.target._zoom)
  }
  return(
    <div className="mapContainer">
      <Map className="fullscreenMap" center={position} zoom={zoom} oncontextmenu={rightClick} onZoom={scrollListener}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {posts.map((element, index) =>
          <Marker key={index} position={element.location} onClick={() => onPostClick(element)}>
          </Marker>
        )}
        {userLocation !== null?
          <Marker position={userLocation} icon={userIcon}>
            <Popup>YOU<br />ASDAS</Popup>
          </Marker>
          :
          <div/>
        }


      </Map>
      <button className="overlayButtonLeft rippleButton">List View</button>
      <button className="overlayButtonRight rippleButton" onClick={newPostClick}>New Post</button>
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    //maps state to props, after this you can for example call props.notification
    userLocation: state.userLocation,
    tempPost: state.tempPost

  }
}

const mapDispatchToProps = {
  //connect reducer functions/dispatchs to props
  //notify (for example)
  notify,
  createPost,
  updateUserLocation,
  setTempPost

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapContainerOpen)