import React, {Component} from 'react'
import { BackHandler } from 'react-native'
import { Provider, connect } from 'react-redux'
import { StackNavigator, addNavigationHelpers, NavigationActions } from 'react-navigation'

import Routes from './config/routes'

import getStore from './config/store'

const Navigator = StackNavigator(Routes, {
    headerMode: 'screen'
})

const navReducer = (state, action) => {
    const newState = Navigator.router.getStateForAction(action, state)
    return newState || state
}

class App extends Component {
    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    }
    onBackPress = () => {
        const { dispatch, nav } = this.props;
        if (nav.index === 0) {
            return false;
        }
        dispatch(NavigationActions.back());
        return true;
    };

    render(){
        return (
            <Navigator 
                navigation={addNavigationHelpers({
                    dispatch: this.props.dispatch,
                    state: this.props.nav
                })}
            />
        )
    }
}

const store = getStore(navReducer);
const AppIndex = connect( state => ({ nav: state.nav }) )(App)

export default Index = () => {
    return (
        <Provider store={store}>
            <AppIndex />
        </Provider>
    )
}