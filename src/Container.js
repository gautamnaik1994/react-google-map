import React from "react";
import GoogleApiComponent from "./utils/GoogleApiComponent";
import Map from "./Map";

export class Container extends React.Component {
  render() {
    const style = {
      width: "100vw",
      height: "100vh"
    };
    if (!this.props.loaded) {
      return <div>Loading...</div>;
    }
    return (
      <div style={style}>
        <Map google={this.props.google} />
      </div>
    );
  }
}

export default GoogleApiComponent({
  apiKey: "AIzaSyDFRbDZWE9RrYc7Y5CvspVkROHWqRy_vpo"
})(Container);
