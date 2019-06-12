import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home/home';
import OrderView from './components/Orders'
import Login from './containers/Admin/login'
import User from './components/Admin'
import AddReview from './containers/Admin/add'
import UserPosts from './components/Admin/userPosts'
import Logout from './components/Admin/logout';

import OrderHistory from './components/Orders/orders';
import NewOrder from './components/Orders/new';
import Confirm from './components/Orders/confirm';

import ShopMapList from './components/Shops/shopMapList'

// Newly Added
import AboutUs from './components/Home/about';
import ContactUs from './components/Home/contact';
import FAQ from './components/Home/faq';
import Services from './components/Home/services';

import Layout from './hoc/layout';
import Auth from './hoc/auth';
//import TodaysPickUp from './components/Orders/todayspickup';
//import PickUpInTheShop from './components/Orders/pickupsintheshop';
// <Route path="/orders/new-order" exact component={Auth(NewOrder,true)}/>

// Customer Registration
import RegisterUser from './containers/User/register';
import FinishedRegisterUser from './containers/User/registered';

// For Admin
import AdminHome from './components/Home/admin';
//import ManageShops from './containers/Admin/manage';
import RegisterShop from './containers/Admin/register'; // Add a shop
//import EditShop from '';

//For Shop Owner
import ShopOwnerHome from './components/Home/shopOwner';
//import ShopOwnerHome from './containers/ShopOwner/missionControl';
import EditPickUp from  './components/Orders/editpickup';

import EditOrder from './components/Orders/edit';
import UpdateOrder from './components/Orders/update';

//For the user -edit
import EditUserInfo from './containers/User/edit';

const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={Auth(Home,null)}/>
                <Route path="/login" exact component={Auth(Login,false)}/>
                <Route path="/user/logout" exact component={Auth(Logout,true)}/>
                <Route path="/user" exact component={Auth(User,true)}/>
                <Route path="/user/add" exact component={Auth(AddReview,true)}/>
                <Route path="/user/register" exact component={Auth(RegisterUser,true)}/>
                <Route path="/user/finished-register" exact component={Auth(FinishedRegisterUser,true)}/>
                <Route path="/user/user-history" exact component={Auth(OrderHistory,true)}/>
                <Route path="/user/shop-list" exact component={Auth(ShopMapList,true)}/>
                <Route path="/user/edit-pickup/:id" exact component={Auth(EditPickUp,true)}/>
                <Route path="/user/user-reviews" exact component={Auth(UserPosts,true)}/>
                <Route path="/user/edit" exact component={Auth(EditUserInfo,true)}/>
                <Route path="/shop/register" exact component={Auth(RegisterShop,true)}/>
                <Route path="/orders/edit-order/:id" exact component={Auth(EditOrder,true)}/>
                <Route path="/orders/update-order/:id" exact component={Auth(UpdateOrder,true)}/>
                <Route path="/orders/new-order" exact component={Auth(NewOrder,true)}/>
                <Route path="/orders/confirm" exact component={Auth(Confirm,true)}/>
                <Route path="/orders/:id" exact component={Auth(OrderView,true)}/>
                {/* newly added */}
                <Route path="/aboutus" exact component={Auth(AboutUs,true)}/>
                <Route path="/contactus" exact component={Auth(ContactUs,true)}/>
                <Route path="/faq" exact component={Auth(FAQ,true)}/>
                <Route path="/services" exact component={Auth(Services,true)}/>
                <Route path="/shop/mission-control" exact component={Auth(ShopOwnerHome,true)}/>
                <Route path="/admin/shops" exact component={Auth(AdminHome,true)}/>
                {/* <Route path="/user/todays-pickups" exact component={Auth(TodaysPickUp,true)}/> 
                <Route path="/user/pickups_in_the_shop" exact component={Auth(PickUpInTheShop,true)}/>*/}
            </Switch>
        </Layout>
    );
};

export default Routes;