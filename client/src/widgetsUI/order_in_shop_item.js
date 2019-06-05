import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

const OrderInShopItem = (item) => {
    return (
        <Link to={`/orders/update-order/${item._id}`} className="order_item">
            <div className="order_header">
                <strong>Order Number: </strong>
                <h2>{item.orderNo}</h2>
            </div>
            <div className="order_items">
                <div className="order_author">Pick Up Date:{moment(item.pickUpDate).format('L')}</div>
               
                <div className="order_bubble">
                    <strong>Price: </strong> $ {item.totalPrice}
                </div>

                <div className="order_bubble">
                    <strong>Delivered Date: </strong>  {item.deliveredDate}
                </div>

                <div className="order_bubble rating">
                    <strong>Status</strong>  {item.orderStatus} 
                </div>
                <div className="order_bubble rating">
                    <strong>Status:</strong>  o: open order; p: processing; c:completed; a:cancelled 
                </div>
            </div>
        </Link>
    );
};

export default OrderInShopItem;