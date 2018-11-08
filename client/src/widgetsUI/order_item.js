import React from 'react';
import { Link } from 'react-router-dom';

const OrderItem = (item) => {
    return (
        <Link to={`/orders/${item._id}`} className="book_item">
            <div className="book_header">
                <strong>Order Number: </strong>
                <h2>{item.orderNo}</h2>
            </div>
            <div className="book_items">
                <div className="book_author">{item.ownerId}</div>
               
                <div className="book_bubble">
                    <strong>Price: </strong> $ {item.totalPrice}
                </div>

                <div className="book_bubble">
                    <strong>Delivered Date: </strong>  {item.deliveredDate}
                </div>

                <div className="book_bubble rating">
                    <strong>Status</strong>  {item.orderStatus} 
                </div>

            </div>
        </Link>
    );
};

export default OrderItem;