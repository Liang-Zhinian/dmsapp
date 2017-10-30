import { NavigationActions } from 'react-navigation';
import { default as Navigator } from '../navigations/TabView';

const initialState = Navigator.router.getStateForAction(NavigationActions.init());

export default (state = initialState, action) => {
    const nextState = Navigator.router.getStateForAction(action, state);

    // Simply return the original `state` if `nextState` is null or undefined.
    return nextState || state;
}