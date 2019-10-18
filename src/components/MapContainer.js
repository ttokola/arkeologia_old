import React, {Component, useState} from "react"
import {Map, InfoWindow, Marker, GoogleApiWrapper} from "google-maps-react"

const google = window.google

export class MapContainer extends Component {
  constructor(props) {
    super(props)
    this.onMarkerClick = this.onMarkerClick.bind(this)
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    }
  }
  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    })
  }

  render() {
    console.log(this.props)
    if (!this.props.google) {
      return
    }

    return (
      <div
        style={{
          position: "relative",
          height: "calc(100vh - 20px)"
        }}
      >
        <Map style={{}} google={this.props.google} zoom={14}>

          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
          </InfoWindow>
        </Map>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: "API_KEY"
})(MapContainer)