import React from 'react';
import { Link } from "react-router-dom";
import OrderConfirmContainer from '../../containers/orderConfirm_container';

const OrderConfirm = (props) => {
    return (
        
        <div  className="rl_container">
            <div>
            <br/>
                <img className="imgOrderCompleted" alt="Order Completed" src="/images/Order_Complete.png"/>
            </div>
            <br/>
            <OrderConfirmContainer/>
            <Link to={{
            pathname:'/user'
            }}>
            <button type="button">Done</button>
            </Link>
        </div>
      
    );
}

export default OrderConfirm;