import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import OrderConfirmContainer from '../../containers/orderConfirm_container';


class OrderConfirm extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log(this.props);
        /* this.props.history.pushState(null, null, this.props.history.location.href);
        window.onpopstate = function(event) {
            this.props.history.go(1);
        }; */
        setTimeout(() => {
            window.history.forward()
          }, 0);
          window.onunload=function(){};
    }
 

    render () {
        return (
            <div className="rl_container">
                <div>
                    <br/>
                    <img className="imgOrderCompleted" alt="Order Completed" src="/images/Order_Complete.png"/>
                </div>
                <br/>
                <OrderConfirmContainer/>
                
                <button
                    type='button'
                    onClick={() => {this.props.history.push('/user')}}
                >Done</button>
{/*                 <Link to={{
                    pathname:'/user'
                }}>
                <button type='button'>Done</button>
                </Link> */}
                <br/>
                <button
                    type='button'
                    onClick={() => {this.props.history.push('/user/logout')}}
                >Log Out</button>
                {/* <Link to={{
                    pathname:'/user/logout'
                }}>
                <button type='button'>Log Out</button>
                </Link> */}
            </div>
      
        );
    }
}

function mapStateToProps(state){
    return{
        user: state.user
    }
  }
export default connect(mapStateToProps)(OrderConfirm);