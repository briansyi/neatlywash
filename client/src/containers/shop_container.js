import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getShopsByZip } from '../actions';

import ShopItem from '../widgetsUI/shop_item';

class ShopContainer extends Component {

    componentWillMount(){
        this.props.dispatch(getShopsByZip(this.props.user.login.zip))
        console.log(this.props);
    }

    renderItems = (shops) => (
        console.log(shops.list),
        shops.list ?
            shops.list.map( item => (
                <ShopItem {...item} key={item._id}/>
            ))
            :null
    )

    render() {
        return (
            <div>
                {this.renderItems(this.props.shops)}
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        shops: state.shops,
        user: state.user
    }
}

export default connect(mapStateToProps)(ShopContainer)