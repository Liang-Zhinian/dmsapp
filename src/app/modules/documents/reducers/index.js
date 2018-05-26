import { combineReducers } from 'redux';

import { NAME } from '../constants'
// import nav from './nav';
import account from './account';
import document from './document';
import login from './login';
import security from './security';

const reducers = {
    // login,
    account,
    document,
    security
};
export default combineReducers(reducers);