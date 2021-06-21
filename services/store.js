import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import user from '../reducers/userReducer';


//const rootReducer = user;

const store = createStore(user, applyMiddleware(thunk));


export default store;