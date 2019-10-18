import React, {Component, useState} from "react"
import {Map, TileLayer, Marker, Popup} from "react-leaflet"
import "../styles/mapContainer.css"



const MapContainerOpen = () => {
  const [position, setPosition] = useState({lat: 51.505, lng: -0.09,})
  const [zoom, setZoom] = useState(13)
  return(
    <div className="fullscreenMap">
      <Map center={position} zoom={zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </Map>
    </div>
  )
}

export default MapContainerOpen