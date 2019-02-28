import React from 'react';
import OrderConfirmContainer from '../../containers/orderConfirm_container';

const OrderConfirm = (props) => {
    return (
        <div  className="rl_container article">
            <br/>
            Thank you for using Neatly Wash!
            <OrderConfirmContainer/>
        </div>
    );
};

export default OrderConfirm;