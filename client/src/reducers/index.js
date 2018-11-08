import { combineReducers } from 'redux';
import orders from './orders_reducer';
import user from './user_reducer';

const rootReducer = combineReducers({
    orders,
    user
});

export default rootReducer;