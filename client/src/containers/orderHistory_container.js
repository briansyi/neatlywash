import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOrderWithUser } from '../actions';

import OrderItem from '../widgetsUI/order_item';

class OrderHistoryContainer extends Component {

    componentWillMount(){
        this.props.dispatch(getOrderWithUser(this.props.user.login.id,5,0,'desc'));
    }


    renderItems = (orders) => (
        orders.list ?  
            orders.list.map( item => (
                <OrderItem {...item} key={item._id}/>
            ))
        :null
    )

    loadmore = () => {
        let count = this.props.orders.list.length;
        this.props.dispatch(getOrderWithUser(this.props.user.login.id,5,count,'desc',this.props.orders.list))
    }

    render() {
        return (
            <div>
               {this.renderItems(this.props.orders)}
               <div
                    className="loadmore"
                    onClick={this.loadmore}
                >Load More</div>
            </div>
            
        );
    }
}

function mapStateToProps(state){
    return {
        orders:state.orders,
        user: state.user
    }
}

export default connect(mapStateToProps)(OrderHistoryContainer)