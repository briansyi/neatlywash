import React, { Component } from 'react';
import GoogleMapReact, {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-map-react';
import { connect } from 'react-redux';
import { getShopsByZip } from '../../actions';
import ShopOrderContainer from '../../containers/shop_order_container';
 
//import ShopItem from '../../widgetsUI/shop_item';

const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
class shopMapList extends Component {
  
  componentWillMount(){
    console.log(this.props.user.login.zip);
    this.props.dispatch(getShopsByZip(this.props.user.login.zip))
    //fetch(getShopsByZip(this.props.user.login.zip)).then(response => this.setState({ shops: response.data }));
    console.log("Working??");
    console.log(this.props);
  }

  static defaultProps = {
    center: {
      //lat:this.props.user.lat,
      //lng:this.props.user.lng
      lat: 37.371859,
      lng: -122.02123369999998
    },
    zoom: 12
  }; 

  //const mapCenter = new GoogleMapReact
 // const mapCenter = new {this.props.user.lat, this.props.user.lng}
  renderItems = (shops) => {
    //console.log(shops.list),
    // shops.list ?
    //   shops.list.map( item => (
    //     <ShopItem {...item} key={item._id}/>
    //   ))
    //   :null

/*     shops.list ?
        <Marker
          position={{ lat:shops.lat, lng:shops.lng }}
          key = { shops._id }
          />
      :null */
  }


  render() {
    console.log(this.props);
    let shops = this.props.shops;
    console.log("Hellou?? "+this.props.markers);
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '50vh', width: '100%' }}>
        <GoogleMapReact
          //bootstrapURLKeys={{ key: /* YOUR KEY HERE */ }}
          defaultCenter = {this.props.center}
          defaultZoom={this.props.zoom}
        >
        
        {/* {this.renderItems(this.props.user.shops)}  */}
        {/* <Marker
          position={{ lat:37.955413, lng:-122.337844 }}
          key = {{ 0 } }
          /> */}
          {/* <Marker lat = {this.props.user.lat} lng = {this.props.user.lng} /> */}
          <AnyReactComponent
            //lat={37.955413}
            lat={this.props.user.lat}
            //lng={-122.337844}
            lng= {this.props.user.lng}
            text={'Sunnyvale, CA'}
          />
        </GoogleMapReact>
        
        <ShopOrderContainer/>
      </div>
    );
  }
}

function mapStateToProps(state){
  return{
    shops: state.shops,
    user: state.user
  }
}

export default connect(mapStateToProps)(shopMapList);