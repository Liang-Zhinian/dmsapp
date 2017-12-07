// @flow



/* eslint-disable global-require */
/* eslint-disable no-undef */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import reducers from './reducers';


var isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;
let middleware = [thunk];

if (__DEV__) {
	const reduxImmutableStateInvariant = require('redux-immutable-state-invariant').default();
	middleware = [...middleware, reduxImmutableStateInvariant, logger];
} else {
	middleware = [...middleware];
}

var enhancer = compose(
	applyMiddleware(...middleware),
	autoRehydrate()
);

export default function configureStore(onComplete: ?() => void) {
	const store = createStore(
		reducers,
		undefined,
		enhancer
	);
	persistStore(store, { storage: AsyncStorage }, onComplete);
	if (isDebuggingInChrome) {
		window.store = store;
	}
	return store;
}

// let middleware = [thunk];

// if (__DEV__) {
// 	const reduxImmutableStateInvariant = require('redux-immutable-state-invariant').default();
// 	middleware = [...middleware, reduxImmutableStateInvariant, logger];
// } else {
// 	middleware = [...middleware];
// }

// export default function configureStore(initialState) {
// 	return createStore(
// 		reducers,
// 		initialState,
// 		applyMiddleware(...middleware)
// 	);
// }
