import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOrders } from '../actions';
import { NavLink } from "react-router-dom";

import OrderItem from '../widgetsUI/order_item';

import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';

class HomeContainer extends Component {

    componentWillMount(){
        this.props.dispatch(getOrders(5,0,'desc'))
    }


    renderItems = (orders) => (
        orders.list ?  
        orders.list.map( item => (
                <OrderItem {...item} key={item._id}/>
            ))
        :null
    )

    loadmore = () => {
        let count = this.props.orders.list.length;
        this.props.dispatch(getOrders(5,count,'desc',this.props.orders.list))
    }

    render() {
        return (
           // <div className="avatar">
           <center>
               <br/>
               <br/>
            <div>
                <h1>Welcome to</h1>
            </div>
            <div id="logo_container">
            
                <img alt="Neatly Wash Logo" src="/images/ani_logo.gif" className="imgFrontLogo"/>
               {/* {this.renderItems(this.props.orders)}
               <div 
                    className="loadmore"
                    onClick={this.loadmore}
                >Load More</div> */}
            </div>
            <br/>
            <br/>
            <br/>
            <div>
                <Slider>
	                <img src="/images/SlideN01.png" />
	                <img src="/images/SlideN02.png" />
                </Slider>
            </div>
            <br/>
            <br/>
            <div> 
                <NavLink to={{
                        // Need to update
                        // pathname:'/user/register'
                        pathname:'/user/register'
                    }}>
                    <img alt="Sign Up" src="/images/SignUp.png" className="imgFrontBtn"/>

                    {/* <img alt="Sign Up" src="/images/SignUp.png" style={{width:208,height:53}}/> */}
                </NavLink>
            </div>
            <div> 
                <NavLink to={{
                        pathname:'/login'
                    }}>
                    <img alt="Log In" src="/images/LogIn.png" className="imgFrontBtn"/>
                    </NavLink>
            </div>
            <br/>
            <br/>
            </center>
            
        );
    }
}

function mapStateToProps(state){
    return {
        orders:state.orders
    }
}

export default connect(mapStateToProps)(HomeContainer)