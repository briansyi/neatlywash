export default function(state={},action){
    switch(action.type){
        case 'GET_SHOPS4ADMIN':
            return {...state,list:action.payload}
        case 'GET_SHOPS':
            return {...state,list:action.payload}
        default:
            return state;
    }
}