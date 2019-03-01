import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home/home';
import OrderView from './components/Orders'
import Login from './containers/Admin/login'
import User from './components/Admin'
import AddReview from './containers/Admin/add'
import UserPosts from './components/Admin/userPosts'
import EditReview from './containers/Admin/edit';
import Register from './containers/Admin/register';
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
// <Route path="/orders/new-order" exact component={Auth(NewOrder,true)}/>
               

const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={Auth(Home,null)}/>
                <Route path="/login" exact component={Auth(Login,false)}/>
                <Route path="/user/logout" exact component={Auth(Logout,true)}/>
                <Route path="/user" exact component={Auth(User,true)}/>
                <Route path="/user/add" exact component={Auth(AddReview,true)}/>
                <Route path="/user/register" exact component={Auth(Register,true)}/>
                <Route path="/user/edit-post/:id" exact component={Auth(EditReview,true)}/>
                <Route path="/user/user-history" exact component={Auth(OrderHistory,true)}/>
                <Route path="/user/shop-list" exact component={Auth(ShopMapList,true)}/>
                <Route path="/orders/new-order" exact component={Auth(NewOrder,true)}/>
                <Route path="/orders/confirm" exact component={Auth(Confirm,true)}/>
                <Route path="/orders/:id" exact component={Auth(OrderView,true)}/>
                <Route path="/user/user-reviews" exact component={Auth(UserPosts,true)}/>
                {/* newly added */}
                <Route path="/aboutus" exact component={Auth(AboutUs,true)}/>
                <Route path="/contactus" exact component={Auth(ContactUs,true)}/>
                <Route path="/faq" exact component={Auth(FAQ,true)}/>
                <Route path="/services" exact component={Auth(Services,true)}/>
            </Switch>
        </Layout>
    );
};

export default Routes;