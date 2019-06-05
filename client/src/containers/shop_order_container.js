import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOrderWithShop, getOrderByOrderNo, getOpenInHouseOrderWithShop } from '../actions';

import OrderInShopItem from '../widgetsUI/order_in_shop_item';

class ShopOrderContainer extends Component {
    state = {
        searchOrderNo:''
    }

    componentWillMount(){
        console.log("Need to clean!");
        console.log(this.props);
        let orderStus = 'o';
        
        /* this.setState({
            orders:{
                list:null
            }
        }); */
        
        this.props.dispatch(getOpenInHouseOrderWithShop(this.props.user.login.email,'desc'))
        console.log(this.props);
    }

    renderItems = (orders) => (
        orders.list ?  
            orders.list.map( item => (
                <OrderInShopItem {...item} key={item._id}/>
            ))
        :null
    )

    readyForPickupsOnly = () => {
        // o: open order; p: processing; c:completed; a:cancelled 
        let orderStus = 'o';
        this.props.dispatch(getOrderWithShop(this.props.user.login.email,orderStus,'desc'))
    }

    inHouseOnly = () => {
        // o: open order; p: processing; c:completed; a:cancelled 
        let orderStus = 'p';
        this.props.dispatch(getOrderWithShop(this.props.user.login.email,orderStus,'desc'))
    }

    lookForOrderNo = () => {
        var x = document.getElementById("searchOrderNo").value;
        console.log(x);
        this.props.dispatch(getOrderByOrderNo(x))
    }

    render() {
        return (
            <div>
                {this.renderItems(this.props.orders)}
                <br/>
                <div
                    className="readyForPickupsOnly"
                    onClick={this.readyForPickupsOnly}
                >Ready for pickups</div>
                <br/>
                <div
                    className="inHouseOnly"
                    onClick={this.inHouseOnly}
                >Processing/In-house</div>
                <br/>
                <div className="form_element">
                    <input type="text" name="searchOrderNo" id="searchOrderNo" placeholder="Look for order no." />

                    {/* <input type="submit" onClick={this.lookForOrderNo}> </input> */}

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
        orders: state.orders,
        user: state.user
    }
}

export default connect(mapStateToProps)(ShopOrderContainer)