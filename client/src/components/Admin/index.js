import React from 'react';
import { Link } from "react-router-dom";

const User = (props) => {
    let user = props.user.login;
    return (
        <div className="user_container">
{/*             <div className="avatar">
                <img alt="avatar" src="/images/avatar.png"/>
            </div> */}
            <br/>
            <div className="rl_container">
                <h2>Welcome Back, {user.firstName} {user.lastName}!</h2>
            </div>
{/*             <div className="nfo">
                <div><span>First Name:</span> {user.firstName}</div>
                <div><span>Last Name:</span> {user.lastName}</div>
                <div><span>Email:</span> {user.email}</div>
            </div> */}
            <div> 
                <Link to={{
                        pathname:'/user/edit'
                    }}>
                    <img alt="My Account" className="imgDashboard" src="/images/Dashboard_My_Account.png" /></Link>
            </div>
            <div> 
                <Link to={{
                        pathname:'/orders/new-order'
                    }}>
                    <img alt="Schedule a Pick Up" className="imgDashboard" src="/images/Dashboard_PickUp.png"/></Link>
            </div>
            <div> 
                <Link to={{
                        pathname:'/user/user-history'
                    }}>
                    <img alt="Order Status" className="imgDashboard" src="/images/Dashboard_Order_Status.png"/></Link>
            </div>
        </div>
    );
};

export default User;