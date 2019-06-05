import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';

const SidenavItems = ({user}) => {

    const items = [
        // role: 0 = reg. customer; 1 = shop owner; 2 = admin.; 99 = disabled
        {
            type:'navItem',
            icon:'home',
            text:'Home',
            link:'/',
            role:0,
            restricted:false
        },
        // Create a pick up
        {
            type:'navItem',
            icon:'file-text-o',
            text:'Create A Pick Up',
            link:'/orders/new-order',
            role:0,
            restricted:true
        },
        // Today's Pick-ups
        // Get 'o' status
/*         {
            type:'navItem',
            icon:'file-text-o',
            text:'Today\'s Pickups',
            link:'/user/todays-pickups',
            role:1,
            restricted:true 
        }, */
        // Pick Ups in the shop
        // Get 'p' status
/*         {
            type:'navItem',
            icon:'file-text-o',
            text:'Pick Ups in the Shop',
            link:'/user/pickups_in_the_shop',
            role:1,
            restricted:true
        }, */
        {
            type:'navItem',
            icon:'file-text-o',
            text:'Mission Control for Shop',
            link:'/shop/mission-control',
            role:1,
            restricted:true
        },

        {
            type:'navItem',
            icon:'file-text-o',
            text:'My Profile',
            link:'/user',
            role:0,
            restricted:true
        },
        // Not now: only for admin.
        /*{
            type:'navItem',
            icon:'file-text-o',
            text:'Add Shop',
            link:'/user/register',
            role:2,
            restricted:true
        },*/
        {
            type:'navItem',
            icon:'file-text-o',
            text:'Manage Shops',
            link:'/admin/shops',
            role:2,
            restricted:true
        },
        {
            type:'navItem',
            icon:'file-text-o',
            text:'Login',
            link:'/login',
            role:0,
            restricted:false,
            exclude:true
        },
        {
            type:'navItem',
            icon:'file-text-o',
            text:'Sign Up',
            link:'/user/register',
            role:0,
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
            role:0,
            restricted:true
        },
        // Services
        {
            type:'navItem',
            icon:'file-text-o',
            text:'Services',
            link:'/services',
            role:0,
            restricted:true
        },
        // About Us
        {
            type:'navItem',
            icon:'file-text-o',
            text:'About Us',
            link:'/aboutus',
            role:0,
            restricted:true
        },
        // FAQ
        {
            type:'navItem',
            icon:'file-text-o',
            text:'FAQ',
            link:'/faq',
            role:0,
            restricted:true
        },
        // Contact Us
        {
            type:'navItem',
            icon:'file-text-o',
            text:'Contact Us',
            link:'/contactus',
            role:0,
            restricted:true
        },
        // {
        //     type:'navItem',
        //     icon:'file-text-o',
        //     text:'Shop List',
        //     link:'/user/shop-list',
        //     role:0,
        //     restricted:true
        // },
        {
            type:'navItem',
            icon:'file-text-o',
            text:'Log Out',
            link:'/user/logout',
            role:0,
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

/*     const showItems = () => (
        user.login ?
            items.map((item,i)=>{
                if(user.login.isAuth) {
                    return !item.exclude ?
                        element(item,i)
                    :null
                } else {
                    return !item.restricted ? //&& (item.role <= user.login.role) ?
                        element(item,i)
                    :null
                }
            })
        :null
    ) */

    const showItems = () => (
        user.login ?
            items.map((item,i)=>{
                if(user.login.isAuth) {
                    if(item.role <= user.login.role) {
                        console.log(user.login);
                        return !item.exclude ?
                            element(item,i)
                        :null
                    } else {
                        console.log("What about here??");
                        /*
                        return !item.exclude ?
                            element(item,i)
                        :null*/
                    }
                } else {
                    return !item.restricted ? //&& (item.role <= user.login.role) ?
                        element(item,i)
                    :null
                }
            })
        :null
    )



/*     const showItems = () => (
        console.log(typeof(user.login)),
        items.map((item,i)=>{
            if(typeof(user.login) ==! undefined) {
                console.log("I am here222");
                console.log(user);
                if(user.login.isAuth) {
                    return !item.exclude ? element(item,i)
                    :null
                } else {
                    return !item.restricted ? element(item,i)
                    :null
                }
            } else {
                console.log("I am here333");
                console.log(user);
                return !item.restricted ? element(item,i)
                :null
            }
        })
    ) */

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