import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import getRootReducer from '../reducers';


const middlewares = [];

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

// const store = createStore(reducers, applyMiddleware(...middlewares));

// export default store;


export default function getStore(navReducer) {
    return store = createStore(getRootReducer(navReducer), undefined, applyMiddleware(...middlewares))
}