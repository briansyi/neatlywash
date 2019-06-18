import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getShopForAdmin } from '../actions';

import OrderItem from '../widgetsUI/order_item';

class ShopList4AdminContainer extends Component {

    componentWillMount(){
        this.props.dispatch(getShopForAdmin(this.props.user.login.email,1,0,'desc'));
        console.log("Am I getting a list??");
        console.log(this.props);
    }


    renderItems = (shops4Admin) => (
        console.log(shops4Admin.list),
        shops4Admin.list ?  
        shops4Admin.list.map( item => (
                <OrderItem {...item} key={item._id}/>
            ))
        :null
    )

    loadmore = () => {
        let count = this.props.shops4Admin.list.length;
        console.log(this.props);
        this.props.dispatch(getShopForAdmin(this.props.user.login.email,1,count,'desc',this.props.orders.list))
    }

    render() {
        return (
            <div>
               {this.renderItems(this.props.shops4Admin)}
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
        shops:state.shops,
        orders:state.orders,
        user: state.user
    }
}

export default connect(mapStateToProps)(ShopList4AdminContainer)