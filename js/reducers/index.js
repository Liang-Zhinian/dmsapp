import { combineReducers } from 'redux';

//import main from './main';
import nav from './nav';
import { HomeStackView, DocumentsStackView, AccountStackView, DownloadsStackView, AboutStackView, SearchStackView, SettingsStackView } from '../components/stackNavigation'


export default combineReducers({
    //main,
    nav: nav,
    home: (state, action) => HomeStackView.router.getStateForAction(action, state),
    documents: (state, action) => DocumentsStackView.router.getStateForAction(action, state),
})