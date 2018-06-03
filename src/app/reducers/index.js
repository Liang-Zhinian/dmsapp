import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';

import auth from './auth';
// import nav from './nav';
import security from './security';
import locale from './locale';
import { Documents } from '../modules';

const AppReducer = combineReducers({
  // nav,
  locale,
  auth,
  security,
  [Documents.NAME]: Documents.reducer
});

export default AppReducer;
