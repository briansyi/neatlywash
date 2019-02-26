import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOrders } from '../actions';
import { NavLink } from "react-router-dom";

import BookItem from '../widgetsUI/order_item';

class HomeContainer extends Component {

    componentWillMount(){
        console.log(this.props);
        
        this.props.dispatch(getOrders(1,0,'desc'))
    }


    renderItems = (orders) => (
        orders.list ?  
        orders.list.map( item => (
                <BookItem {...item} key={item._id}/>
            ))
        :null
    )

    loadmore = () => {
        let count = this.props.orders.list.length;
        this.props.dispatch(getOrders(1,count,'desc',this.props.orders.list))
    }

    render() {
        return (
           // <div className="avatar">
           <center>
               <br/>
               <br/>
            <div>
                <h1>Welcome to Neatly Wash</h1>
            </div>
            <div id="logo_container">
            
                <img alt="avatar" src="/images/ani_logo.gif"/>
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
                <NavLink to={{
                        pathname:'/'
                    }}>
                    <img alt="Sign Up" src="/images/SignUp.png" style={{width:208,height:53}}/></NavLink>
            </div>
            <br/>
            <div> 
                <NavLink to={{
                        pathname:'/login'
                    }}>
                    <img alt="Log In" src="/images/LogIn.png"  style={{width:208,height:53}}/></NavLink>
            </div>
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