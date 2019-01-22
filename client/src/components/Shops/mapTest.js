import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { getShopsByZip } from '../../actions';
import { connect } from 'react-redux';
 
const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
class mapTest extends Component {

  componentWillMount(){
    this.props.dispatch(getShopsByZip(this.props.user))
  }


  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };
 
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '30vh', width: '100%' }}>
        <GoogleMapReact
          //bootstrapURLKeys={{ key: /* YOUR KEY HERE */ }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text={'Kreyser Avrora'}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

function mapStateToProps(state){
  return{
      user: state.user
  }
}

export default connect(mapStateToProps)(mapTest);