export default function(state={},action){
    switch(action.type){
        case 'GET_ORDERS':
            return { ...state,list:action.payload }
        case 'GET_ORDER':
        console.log("GET_ORDER\n"+action.payload)
            return {...state,order:action.payload}
        case 'GET_BOOK_W_USER':
            return {
                ...state,
                book:action.payload.book,
                reviewer:action.payload.reviewer
            }
        case 'CLEAR_BOOK_W_USER':
            return {
                ...state,
                book:action.payload.book,
                reviewer:action.payload.reviewer
            }
        case 'ADD_ORDER':
            return {...state,newOrder:action.payload}
        case 'GET_USERS':
            return {...state,list:action.payload}
        case 'UPDATE_USER':
            return {...state}
        case 'CLEAR_NEWORDER':
            return {...state,newOrder:action.payload}
        case 'UPDATE_ORDER':
            return {
                ...state,
                updateOrder:action.payload.success,
                book:action.payload.doc
            }
        case 'DELETE_ORDER':
            return {
                ...state,
                postDeleted:action.payload
            }
        case 'CLEAR_BOOK':
            return {
                ...state,
                updateBook:action.payload.updateBook,
                book:action.payload.book,
                postDeleted:action.payload.postDeleted
            }
        default:
            return state;
    }
}