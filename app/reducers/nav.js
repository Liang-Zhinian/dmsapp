import { NavigationActions } from 'react-navigation';
import { default as Navigator } from '../navigation';

const initialState = Navigator.router.getStateForAction(NavigationActions.init());

export default (state = initialState, action) => {
    
    // **action**  will be of type: {"type": "Navigation/NAVIGATE", "routeName": SOME_ROUTE}
    // gets the new updated state of the navigator (previous state + new route), will return null if the action is not understandable.
    const nextState = Navigator.router.getStateForAction(action, state);

    // Simply return the original `state` if `nextState` is null or undefined.
    return nextState || state;
}