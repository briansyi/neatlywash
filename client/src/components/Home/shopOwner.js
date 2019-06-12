import React from 'react';
import ShopOwnerHomeContainer from '../../containers/shop_order_container'

const ShopOwnerHome = () => {
    return (
        <div>
            <div>
            <img className="imgOrderHistory" alt="Order History" src="/images/Mission_Control.png"/>
            </div>
            <div>
                <ShopOwnerHomeContainer/>
            </div>
        </div>
    );
};

export default ShopOwnerHome;