import React, {useState, useEffect} from "react"
import {connect} from "react-redux"
import {Map, TileLayer, Marker, Popup} from "react-leaflet"
import L from "leaflet"
import "../styles/mapContainer.css"
import "leaflet/dist/leaflet.css"

import icon from "../resources/marker-icon.png"
import iconx2 from "../resources/marker-icon-2x.png"
import iconShadow from "../resources/marker-shadow.png"

import {notify} from "../reducers/notificationReducer"
import {createPost} from "../reducers/postReducer"

let defaultIcon = L.icon({
  iconRetinaUrl: iconx2,
  iconUrl: icon,
  shadowUrl: iconShadow
})
L.Marker.prototype.options.icon = defaultIcon



const MapContainerOpen = (props) => {
  //props has array of posts at props.posts
  const [position, setPosition] = useState({lat: 65.003898, lng: 25.459645})
  const [zoom, setZoom] = useState(13)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    console.log("initing posts")
    if(posts.length === 0){
      setPosts(props.posts)
    }
  }, [props])




  const onPostClick = (props) => {

    console.log(`Clicked post: ${props.title}`)
    //maybe use router to change url to post/id and that triggers post view pop up render.
  }

  const mapClick = (event) => {

    console.log(event.latlng)
  }

  const rightClick = (event) => {
    console.log("right click at ", event.latlng)
    const newPost = {author:"Niklas", title:"PLACEHOLDER TITLE", story:"PLACEHOLDER STORY", image:null, location:event.latlng}
    props.createPost(newPost)
    setPosts(posts.concat(newPost))
    setPosition(event.latlng)
  }

  const newPostClick = (event) => {
    event.preventDefault()
    console.log("Adding new post")

  }

  const scrollListener = (event) => {
    console.log(`Setting zoom to ${event.target._zoom}`)
    setZoom(event.target._zoom)
  }
  console.log(props)
  return(
    <div className="mapContainer">
      <Map className="fullscreenMap" center={position} zoom={zoom} onClick={mapClick} oncontextmenu={rightClick} onZoom={scrollListener}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {posts.map((element, index) =>
          <Marker key={index} position={element.location} onClick={() => onPostClick(element)}>
            <Popup>{element.title}<br />{element.story}</Popup>
          </Marker>
        )}


      </Map>
      <button className="overlayButtonLeft rippleButton">List View</button>
      <button className="overlayButtonRight rippleButton" onClick={newPostClick}>New Post</button>
    </div>
  )
}

export default connect(
  null,
  {notify, createPost}
)(MapContainerOpen)