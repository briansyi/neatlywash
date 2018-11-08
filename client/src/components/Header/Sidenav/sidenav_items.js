import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';

const SidenavItems = ({user}) => {

    const items = [
        {
            type:'navItem',
            icon:'home',
            text:'Home',
            link:'/',
            restricted:false
        },
        {
            type:'navItem',
            icon:'file-text-o',
            text:'My Profile',
            link:'/user',
            restricted:true
        },
        // Not now: only for admin.
        // {
        //     type:'navItem',
        //     icon:'file-text-o',
        //     text:'Add Shop',
        //     link:'/user/register',
        //     restricted:true
        // },
        {
            type:'navItem',
            icon:'file-text-o',
            text:'Login',
            link:'/login',
            restricted:false,
            exclude:true
        },
        // {
        //     type:'navItem',
        //     icon:'file-text-o',
        //     text:'My History',
        //     link:'/user/user-history',
        //     restricted:true
        // },
        {
            type:'navItem',
            icon:'file-text-o',
            text:'Order History',
            link:'/user/user-history',
            restricted:true
        },
        {
            type:'navItem',
            icon:'file-text-o',
            text:'Create An Order',
            link:'/orders/new-order',
            restricted:true
        },
        {
            type:'navItem',
            icon:'file-text-o',
            text:'Shop List',
            link:'/user/shop-list',
            restricted:true
        },
        {
            type:'navItem',
            icon:'file-text-o',
            text:'Logout',
            link:'/user/logout',
            restricted:true
        }
    ]

    const element = (item,i) => (
        <div key={i} className={item.type}>
            <Link to={item.link}>
                <FontAwesome name={item.icon}/>
                {item.text}
            </Link>
        </div>
    )

    const showItems = () => (
        user.login ?
            items.map((item,i)=>{
                if(user.login.isAuth) {
                    console.log("Hi_1.5");
                    return !item.exclude ?
                        element(item,i)
                    :null
                } else {
                    console.log("Hi");
                    return !item.restricted ?
                        element(item,i)
                    :null
                }
            })
        :null
    )

    // const showItems = () => (
    //     console.log(typeof(user.login)),
    //     items.map((item,i)=>{
    //         if(typeof(user.login) ==! undefined) {
    //             console.log("I am here222");
    //             console.log(user);
    //             if(user.login.isAuth) {
    //                 return !item.exclude ? element(item,i)
    //                 :null
    //             } else {
    //                 return !item.restricted ? element(item,i)
    //                 :null
    //             }
    //         } else {
    //             console.log("I am here333");
    //             console.log(user);
    //             return !item.restricted ? element(item,i)
    //             :null
    //         }
    //     })
    // )

    return (
        <div>
            {showItems()}
        </div>
    );
};

function mapStateToProps(state){
    return{
        user: state.user
    }
}

export default connect(mapStateToProps)(SidenavItems)