import React from 'react';
import { Link } from 'react-router-dom';

const Shop4AdminItem = (shop) => {
    return (
        <Link to={`/shops/${item._id}`} className="order_item">
            <div className="order_header">
                <strong>Order Number: </strong>
                <h2>{item.orderNo}</h2>
            </div>
            <div className="order_items">
                <div className="order_author">{item.ownerId}</div>
               
                <div className="order_bubble">
                    <strong>Price: </strong> $ {item.totalPrice}
                </div>

                <div className="order_bubble">
                    <strong>Delivered Date: </strong>  {item.deliveredDate}
                </div>

                <div className="order_bubble rating">
                    <strong>Status</strong>  {item.orderStatus} 
                </div>

            </div>
        </Link>
    );
};

export default Shop4AdminItem;