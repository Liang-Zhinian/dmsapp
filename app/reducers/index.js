import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';

import { AppNavigator } from '../navigators/AppNavigator';
import { Documents } from '../modules'
import Toast from '../components/ToastModule';

// Start with two routes: The Main screen, with the Login screen on top.
const firstAction = AppNavigator.router.getActionForPathAndParams('Main');
const tempNavState = AppNavigator.router.getStateForAction(firstAction);
const secondAction = AppNavigator.router.getActionForPathAndParams('Login');
const initialNavState = AppNavigator.router.getStateForAction(
  secondAction,
  tempNavState
);

function nav(state = initialNavState, action) {
  let nextState;
  switch (action.type) {
    case 'Login':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.back(),
        state
      );
      break;
    case 'Logout':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Login' }),
        state
      );
      break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  // nextState = AppNavigator.router.getStateForAction(action, state);

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}

const initialAuthState = { isLoggedIn: false };

function auth(state = initialAuthState, action) {
  const { payload } = action;
  switch (action.type) {
    case 'Login':
      return { ...state, isLoggedIn: true, user: payload };
    case 'Logout':
      return { ...state, isLoggedIn: false, user: null };
    case 'ERROR':
      console.log(payload);
      
      Toast.show(payload.message, Toast.SHORT);
      return { ...state, isLoggedIn: false, user: null };
    default:
      return state;
  }
}

const AppReducer = combineReducers({
  nav,
  auth,
  [Documents.NAME]: Documents.reducer
});

export default AppReducer;
