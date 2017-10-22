import { NavigationActions } from 'react-navigation';
import TabView from '../TabView';

const initialState = TabView.router.getStateForAction(NavigationActions.init());

export default (state = initialState, action) => {
    if (action.type === 'JUMP_TO_TAB') {
        return { ...state, index: 0 }
    } else {
        const nextState = TabView.router.getStateForAction(action, state);

        return nextState || state;
    }
}