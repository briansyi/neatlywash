import React, { Component } from 'react';
import GoogleMapReact, {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-map-react';
 
const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
class shopMapList extends Component {
  static defaultProps = {
    center: {
      lat: 37.371859,
      lng: -122.02123369999998
    },
    zoom: 11
  };
  
 
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          //bootstrapURLKeys={{ key: /* YOUR KEY HERE */ }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={37.955413}
            lng={-122.337844}
            text={'Kreyser Avrora'}
          />
        </GoogleMapReact>
      </div>
    );
  }
}
export default shopMapList;