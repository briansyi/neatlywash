import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getShops } from '../../actions';
import moment from 'moment-js';
import { Link } from 'react-router-dom';

class UserPosts extends Component {

    componentWillMount(){
        this.props.dispatch(getShops(this.props.user.login.zip))
    }

    showShopsList = (user) => (
        user.zip ?
            user.zip.map(item => (
                <tr key={item._id}>
                    <td><Link to={
                        `/orders/new/${item._id}`
                    }>
                        {item.firstName}
                    </Link></td>
                    <td>{item.address1}+" "+{item.address2}+"\n"+{item.city}+", "+ {item.state}+" " +{item.zip}</td>
                </tr>
            ))
        :null
        
    )

    render () {
        return (
            <div className="user_posts">
                <h4>Shop list in your zip code</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.showShopsList(user)}
                    </tbody>
                </table>
            </div>
        )
    }

}

function mapStateToProps(state){
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(UserPosts)