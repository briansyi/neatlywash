import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import OrderConfirmContainer from '../../containers/orderConfirm_container';


class OrderConfirm extends Component {

    constructor(props) {
        super(props);
    }

    onDone(){
        this.props.history.push('/user');
    }


    render () {
        return (
            <div  className="rl_container">
                <div>
                    <br/>
                    <img className="imgOrderCompleted" alt="Order Completed" src="/images/Order_Complete.png"/>
                </div>
                <br/>
                <OrderConfirmContainer/>
                <Link to={{
                    pathname:'/user'
                }}>
                <button onClick={this.onDone}>Done</button>
                </Link>
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