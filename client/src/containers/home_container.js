import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOrders } from '../actions';

import BookItem from '../widgetsUI/book_item';

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
            <div id="logo_container">
            
                <img alt="avatar" src="/images/ani_logo.gif"/>
               {/* {this.renderItems(this.props.orders)}
               <div 
                    className="loadmore"
                    onClick={this.loadmore}
                >Load More</div> */}
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