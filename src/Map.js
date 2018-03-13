import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import {camelize} from './utils/helpers';
const evtNames = ['ready','click', 'dragend'];


class Map extends React.Component {
  constructor(props) {
    super(props);
    const { lat, lng } = this.props.initialCenter;
    this.state = {
      currentLocation: {
        lat: lat,
        lng: lng
      }
    };
  }
  renderChildren = () => {
    const { children } = this.props;
    if (!children) return;
    return React.Children.map(children, c => {
      return React.cloneElement(c, {
        map: this.map,
        google: this.props.google,
        mapCenter: this.state.currentLocation
      });
    })
  }
  loadMap = () => {
    if (this.props && this.props.google) {
      // google is available
      const { google } = this.props;
      const maps = google.maps;
      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);
      let { initialCenter, zoom } = this.props;
      const { lat, lng } = this.state.currentLocation;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign(
        {},
        {
          center: center,
          zoom: zoom
        }
      );
      this.map = new maps.Map(node, mapConfig);
      evtNames.forEach(e => {
        this.map.addListener(e, this.handleEvent(e));
      });
    }
  }
  handleEvent = (evtName) => {
      let timeout;
      const handlerName = `on${camelize(evtName)}`;
      return (e) => {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        timeout = setTimeout(() => {
          if (this.props[handlerName]) {
            this.props[handlerName](this.props, this.map, e);
          }
        }, 0);
      }
  }
  recenterMap = () => {
    const map = this.map;
    const curr = this.state.currentLocation;
    const google = this.props.google;
    const maps = google.maps;
    if (map) {
      let center = new maps.LatLng(curr.lat, curr.lng);
      map.panTo(center);
    }
  }
  componentDidMount() {
    if (this.props.centerAroundCurrentLocation) {
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
          const coords = pos.coords;
          this.setState({
            currentLocation: {
              lat: coords.latitude,
              lng: coords.longitude
            }
          });
        });
      }
    }
    this.loadMap();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    if (prevState.currentLocation !== this.state.currentLocation) {
      this.recenterMap();
    }
  }
  render() {
    return (
      <div style={{ height: "100%" }} ref="map">
        Loading map...
         {this.renderChildren()}
      </div>
    );
  }
}
export default Map;

Map.propTypes = {
  google: PropTypes.object,
  zoom: PropTypes.number,
  initialCenter: PropTypes.object,
  centerAroundCurrentLocation: PropTypes.bool,
  onMove: PropTypes.func,
};
evtNames.forEach(e => Map.propTypes[camelize(e)] = PropTypes.func);

Map.defaultProps = {
  zoom: 13,
  initialCenter: {
    lat: 15.276118,
    lng: 73.919208
  },
  centerAroundCurrentLocation: true,
  onMove: function() {}
};
