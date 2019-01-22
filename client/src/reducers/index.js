import { combineReducers } from 'redux';
import orders from './orders_reducer';
import user from './user_reducer';
import shops from './shops_reducer';

const rootReducer = combineReducers({
    orders,
    user,
    shops
});

export default rootReducer;