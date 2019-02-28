import React, { Component } from 'react';
import { connect } from 'react-redux';


class OrderConfirmContainer extends Component {

    componentWillMount(){
        console.log(this.props);
    }

    render() {
        return (
            <div>
                <br/>
                Your order number is :
               {(this.props.order.user.lastOrderNo)}
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