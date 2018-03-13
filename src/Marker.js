import React from "react";
import PropTypes from "prop-types";
import { camelize } from "./utils/helpers";

const evtNames = ["click", "mouseover"];
class Marker extends React.Component {
  handleEvent = (evt) => {
    return e => {
      const evtName = `on${camelize(evt)}`;
      if (this.props[evtName]) {
        this.props[evtName](this.props, this.marker, e);
      }
    };
  }
  renderMarker = () => {
    let { map, google, position, mapCenter } = this.props;

    let pos = position || mapCenter;
    position = new google.maps.LatLng(pos.lat, pos.lng);
    const pref = {
      map: map,
      position: position
    };
    this.marker = new google.maps.Marker(pref);
    evtNames.forEach(e => {
      this.marker.addListener(e, this.handleEvent(e));
    });
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.map !== prevProps.map ||
      this.props.position !== prevProps.position
    ) {
      this.renderMarker();
    }
  }
  componentWillUnmount() {
    if (this.marker) {
      this.marker.setMap(null);
    }
  }
  render() {
    return null;
  }
}

export default Marker;

Marker.propTypes = {
  position: PropTypes.object,
  map: PropTypes.object
};

Marker.defaultProps = {
  zoom: 13,
  onMouseover: function() {}
};
