import React from 'react';
import { Link } from 'react-router-dom';

const ShopItem = (item) => {
    return (
        <Link to={`/admin/shop/edit/${item._id}`} className="order_item">
            <div className="order_item">
                <h2>{item.firstName} {item.lastName}</h2>
            </div>
            <div className="order_bubble">
                {item.email}
            </div>
            <div className="order_bubble">
                {item.address1}
            </div>
            <div className="order_bubble">
                {item.city}, {item.state} {item.zip}
            </div>
            <div className="order_bubble rating">
                Assigned ZIPs: {item.assignedZIPs}
            </div>
        </Link>
    );
};

export default ShopItem;