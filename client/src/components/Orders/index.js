import React, { Component } from 'react';
import { getOrderWithUser, clearOrderWithUser } from '../../actions';
import { connect } from 'react-redux';

class OrderView extends Component {

    componentWillMount(){
        //console.log("Am I here??");
        this.props.dispatch(getOrderWithUser(this.props.user.login.id))
    }

    componentWillUnmount(){
        this.props.dispatch(clearOrderWithUser())
    }

    renderOrder = (orders) => (
        orders.order ? 
            <div className="br_container">
                <div className="br_header">
                    <h2>{orders.order.orderNo}</h2>
                    <h5>{orders.order.pickUpDate}</h5>
                    <div className="br_reviewer">
                        <span>Name:</span> {orders.ordered.firstName} {orders.reviewer.lastName}
                    </div>
                </div>
                <div className="br_review">
                    {orders.order.notesFromCust}
                </div>
                <div className="br_box">
                    <div className="left">
                        <div>
                            <span>Deliverd:</span> {orders.order.deliveredDate}
                        </div>
                        <div>
                            <span>Price:</span> {orders.order.totalPrice}
                        </div>
                    </div>
                    <div className="right">
                        <span>Status</span>
                        <div>{orders.order.orderStatus}</div>
                    </div>
                </div>
            </div>
        :null
    )

    render() {
        let orders = this.props.orders;
        return (
            <div>
                {this.renderOrder(orders)}
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        orders: state.orders
    }
}

export default connect(mapStateToProps)(OrderView)