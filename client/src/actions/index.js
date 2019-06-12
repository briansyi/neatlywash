import axios from 'axios';

// All orders - we do not need now
export function getOrders(
    limit = 10,
    start = 0,
    order = 'asc',
    list = ''
){
    
    const request = axios.get(`/api/getHistoryByShop?limit=${limit}&skip=${start}&order=${order}`)
                    .then(response => {
                            if(list){
                                return [...list,...response.data]
                            } else {
                                return response.data
                            }
                        }
                    )

    return {
        type:'GET_ORDERS',
        payload:request
    }

}

//get the list of orders by user
// export function getOrderWithUser(email){
//     console.log("Hello~ "+email);
//     const request = axios.get(`/api/getHistoryByUser?email=${email}`)

//     return (dispatch)=>{
//         request.then(({data})=>{
//             let order = data;

//             axios.get(`/api/getHistoryByUser?email=${order.ownerId}`)
//             .then(({data})=>{
//                 let response = {
//                     order,
//                     user:data
//                 }

//                 dispatch({
//                     type:'GET_ORDER_W_USER',
//                     payload:response
//                 })
//             })
//         })
//     }
// }

// export function getOrderWithUser(email){
//     console.log("Hello~ "+email);
//     const request = axios.get(`/api/getHistoryByUser?email=${email}`).then(response => response.data);

//     console.log(request);
//     return {
//         type:'GET_ORDER_W_USER',
//         payload:request
//     }
// }
export function getOrderWithUser(
    id,
    limit = 10,
    start = 0,
    order = 'asc',
    list = ''
){
    const request = axios.get(`/api/getHistoryByUser?id=${id}&limit=${limit}&skip=${start}&order=${order}`)
                    .then(response => {
                            if(list){
                                return [...list,...response.data]
                            } else {
                                return response.data
                            }
                        }
                    )
    console.log(request);
    return {
        type:'GET_ORDERS',
        payload:request
    }

}

// Getting orders for shop
// o: Ready for pickups; i: In-house; c: Delievered/Completed
// id:shopOwnerId; status: check above; order: asc as default
export function getOrderWithShop(
    shopEmail,
    orderStatus,
    order = 'asc'
){
    const request = axios.get(`/api/getHistoryByShop?shopEmail=${shopEmail}&orderStatus=${orderStatus}&order=${order}`)
                    .then(response => {
                            return response.data
                        
                        }
                    )
    console.log(request);
    return {
        type:'GET_ORDERS',
        payload:request
    }

}

// Getting orders(open and in-house only) for shop
export function getOpenInHouseOrderWithShop(
    shopEmail,
    order = 'asc'
){
    const request = axios.get(`/api/getOpenInHouseHistoryByShop?shopEmail=${shopEmail}&order=${order}`)
                    .then(response => {
                            return response.data
                        
                        }
                    )
    console.log(request);
    return {
        type:'GET_ORDERS',
        payload:request
    }
}


export function sendEmailToShopOwner(
    zip,
    contents
){
    const request = axios.get(`/api/sendEmailToShopOwner?zip=${zip}&contents=${contents}`)
                .then(response => response.data);
    console.log(request);
    return { 
        //type:'ADD_ORDER',
        //payload:request
    }
}

export function getShopForAdmin(
    limit = 100,
    start = 0,
    order = 'asc',
    list = ''
){
    const request = axios.get(`/api/getShopForAdmin?limit=${limit}&skip=${start}&order=${order}`)
                    .then(response => {
                            if(list){
                                return [...list,...response.data]
                            } else {
                                return response.data
                            }
                        }
                    )
    console.log(request);
    return {
        type:'GET_SHOPS4ADMIN',
        payload:request
    }

}



export function clearOrderWithUser(){
    return {
        type:'CLEAR_ORDER_W_USER',
        payload:{
            order:{},
            user:{}
        }
    }
}

// Place new order
export function addOrder(order){
    console.log("Add an order!");
    console.log(order);
    const request = axios.post('/api/order',order)
        .then(response => response.data);

    return {
        type:'ADD_ORDER',
        payload:request
    }
}

// Start new order
export function startOrder(shopId){

}


// Shop list in same zip code
// Need to work
export function getShopsByZip(zip, list = ''){
    const request = axios.get(`/api/getShops?zip=${zip}`)
                    .then(response => {
                        if(list){
                            return [...list,...response.data]
                        } else {
                            return response.data
                        }
                    }
                    );
    
    return { 
        type:'GET_SHOPS',
        payload:request
    }
}

// Get Shops for edit
// Only for an Admin.
export function getShopsForUpdate(zip){
    //    console.log("zip: "+ zip);
    const request = axios.get(`/api/getShops?zip=${zip}`)
                    .then(response => response.data);
    console.log(request);
    return { 
        type:'ADD_ORDER',
        payload:request
    }
}


// Need work
export function clearShops() {
    return {
        type:'CLEAR_SHOPS',
        payload:{}
    } 
}


export function clearNewOrder() {
    return {
        type:'CLEAR_NEWORDER',
        payload:{}
    }
}

// Not now
export function getUserPosts(userId){
    const request = axios.get(`/api/user_posts?user=${userId}`)
                    .then(response => response.data)
    return {
        type:'GET_USER_POSTS',
        payload:request
    }
}

// Get one order by order id
export function getOrder(id){
    const request = axios.get(`/api/getOrder?id=${id}`)
                    .then(response => response.data);
    //console.log(response.data)
    return {
        type:'GET_ORDER',
        payload:request
    }
}

// Get one order by order no
export function getOrderByOrderNo(orderNo){
    const request = axios.get(`/api/getOrderByOrderNo?orderNo=${orderNo}`)
                    .then(response => response.data);
    //console.log(response.data)
    return {
        type:'GET_ORDERS',
        payload:request
    }
}

// Finished
export function updateOrder(data){
    const request = axios.post(`/api/order_update`,data)
                .then(response => response.data);

    return {
        type:'UPDATE_ORDER',
        payload:request
    }

}

// Not now
// Maybe only for an Admin
export function deleteOrder(id){
    const request = axios.delete(`/api/delete_order?id=${id}`)
                    .then(response => response.data)

    return {
        type:'DELETE_ORDER',
        payload:request
    }
}

export function clearOrder(){
    return{
        type:'CLEAR_ORDER',
        payload:{
            order:null,
            updateOrder:false,
            postDeleted:false
        }
    }
}


/*========= USER ===========*/

export function loginUser({email,password}){
    const request = axios.post('/api/login',{email,password})
                .then(response => response.data)

    return {
        type:'USER_LOGIN',
        payload:request
    }
}

export function auth(){
    const request = axios.get('/api/auth')
                .then(response => response.data);

    return {
        type:'USER_AUTH',
        payload:request
    }

}

export function getUsers(){
    const request = axios.get(`/api/users`)
                    .then(response => response.data);
        
    return {
        type:'GET_USERS',
        payload:request
    }
}

export function getUser(email){
    const request = axios.post('/api/user_info')
                    .then(response => response.data);

    return {
        type: 'GET_USER',
        payload:request
    }
}

export function userRegister(user){
    console.log(request);
    const request = axios.post(`/api/register`,user)
                .then(response => response.data);
    return {
                type:'USER_REGISTER',
                payload:request
    }
}


// Originally userRegister
export function shopRegister(user,userList){
    console.log(request);
    const request = axios.post(`/api/register`,user)
    return (dispatch) =>{
        request.then(({data})=>{
            let users = data.success ? [...userList,data.user]:userList;
            let response = {
                success:data.success,
                users
            }

            dispatch({
                type:'USER_REGISTER',
                payload:response
            })
        })
    }
}


export function userInfoUpdate(user){
    const request = axios.post(`/api/user_update`,user)
    .then(response => response.data);

    return {
    type:'UPDATE_USER',
    payload:request
    }
}