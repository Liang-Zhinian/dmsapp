import { combineReducers } from 'redux';

import nav from './nav';
import { documents } from '../modules'


export default combineReducers({
    //every modules reducer should be define here
    nav: nav,
    [documents.NAME]: documents.reducer
})
