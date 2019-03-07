import React from 'react';
import OrderHistoryContainer from '../../containers/orderHistory_container';

const OrderHistory = (props) => {
    return (
        <div>
            <div>
                <img className="imgOrderHistory" alt="Order History" src="/images/Order_History.png"/>
            </div>
            <div>
                <OrderHistoryContainer/>
            </div>
        </div>
    );
};

export default OrderHistory;