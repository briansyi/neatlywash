import React from 'react';
import { Link } from 'react-router-dom';

const ShopItem = (item) => {
    return (
        <Link to={`/shops/${item._id}`} className="shop_item">
            <div className="shop_header">
                <h2>{item.firstName} {item.lastName}</h2>
            </div>
            <div className="shop_item">
                {item.address1}
            </div>
            <div className="shop_item">
                {item.address2}
            </div>
            <div className="shop_item">
                {item.city}, {item.state} {item.zip}
            </div>
        </Link>
    );
};

export default ShopItem;