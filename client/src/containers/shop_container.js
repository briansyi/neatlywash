import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getShopForAdmin } from '../actions';

import ShopItem from '../widgetsUI/shop_item';

class ShopContainer extends Component {


    componentWillMount(){
        this.props.dispatch(getShopForAdmin(10,0,'desc'));
        console.log("Am I getting a list??");
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

    loadmore = () => {
        let count = this.props.shops.list.length;
        console.log(this.props);
        this.props.dispatch(getShopForAdmin(10,count,'desc',this.props.shops.list))
    }

    render() {
        return (
            <div>
               {this.renderItems(this.props.shops)}
                <div
                    className="addShop"
                    onClick={this.readyForPickupsOnly}
                >Ready for pickups</div>
                <br/>
                <div className="form_element">
                    <input type="text" name="searchShopByZip" id="searchShopByZip" placeholder="Look for Shop by ZIP" />
                    <button onClick={this.lookForOrderNo}>
                            Search
                    </button>
                </div>
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