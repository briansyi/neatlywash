import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';


class OrderConfirmContainer extends Component {

    componentWillMount(){
        console.log(this.props);
    }

    render() {
        return (
            <div className="imgOrderCompleted">
                <br/>Your order number is :
               {(this.props.order.user.lastOrderNo)}
               <br/><br/><br/>
                Thank you for choosing us. We'll pick up your laundry on {moment(this.props.order.user.lastPickUpDate).format('L')} between 6 to 9 PM.
                <br/><br/>
                Once we received your laundry, we will contact to you via phone call or text message to confirm the price and special care.
            </div>
            
        );
    }
}

function mapStateToProps(state){
    return {
        order:state
    }
}

export default connect(mapStateToProps)(OrderConfirmContainer)