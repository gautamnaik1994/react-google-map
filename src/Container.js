import React from "react";
import GoogleApiComponent from "./utils/GoogleApiComponent";
import Map from "./Map";
import Marker from "./Marker";
import InfoWindow from "./InfoWindow";

export class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    };
  }
  onMarkerClick = (props, marker, e) => {
    console.log("Marker clicked");
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };
  onInfoWindowClose = () => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }
  onMapClick = () => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }
  render() {
    const style = {
      width: "100vw",
      height: "100vh"
    };
    if (!this.props.loaded) {
      return <div>Loading...</div>;
    }
    const pos = { lat: 37.759703, lng: -122.428093 };
    return (
      <div style={style}>
        <Map google={this.props.google} onClick={this.onMapClick}>
          <Marker onClick={this.onMarkerClick} name={"Dolores park"} />

          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onInfoWindowClose}
          >
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiComponent({
  apiKey: "AIzaSyDFRbDZWE9RrYc7Y5CvspVkROHWqRy_vpo"
})(Container);
