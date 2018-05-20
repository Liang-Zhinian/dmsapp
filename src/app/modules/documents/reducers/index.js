import { combineReducers } from 'redux';

import { NAME } from '../constants'
// import nav from './nav';
import account from './account';
import document from './document';
import login from './login';

const reducers = {
    // login,
    account,
    document,
};
export default combineReducers(reducers);