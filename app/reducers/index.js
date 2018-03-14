import { combineReducers } from 'redux';

import nav from './nav';
import NavigationReducer from "./navigationReducer";
import { Documents } from '../modules'


export default combineReducers({
    //every modules reducer should be define here
    nav,
    // NavigationReducer,
    [Documents.NAME]: Documents.reducer
})
