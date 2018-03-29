import React, { Component } from 'react';
import * as ReactNavigation from 'react-navigation';

import { connect } from 'react-redux';
import MainNavigation from './navigation';
import { BackHandler, Platform, DeviceEventEmitter } from 'react-native';
import { addListener } from './utils/redux';

import LoginScreen from './login/LoginScreen';
import MainScreen from './MainScreen';
import ProfileScreen from './ProfileScreen';

export const AppNavigator = ReactNavigation.StackNavigator({
    Login: { screen: LoginScreen },
    Main: { screen: MainScreen },
    Profile: { screen: ProfileScreen },
});

class AppWithNavigationState extends Component {
    componentDidMount() {
        DeviceEventEmitter.addListener('appStateChange', this.handleAppStateChange);
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }

    componentWillUnmount() {
        DeviceEventEmitter.removeListener('appStateChange', this.handleAppStateChange);
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    }

    render() {
        // if (!this.props.isLoggedIn) {
        //     return <LoginScreen />;
        // }

        const { dispatch, nav } = this.props;
        return (
            <AppNavigator
                navigation={{
                    dispatch,
                    state: nav,
                    addListener,
                }}
            />
        );
    }

    handleAppStateChange = (appState) => {
        console.log(`current state: ${appState.currentAppState}`);
        if (appState.currentAppState === 'active') {

        }
    }

    onBackPress = () => {
        const { dispatch, nav } = this.props;
        if (this.isRootScreen(nav)) {
            BackHandler.exitApp();
            return;
        }

        dispatch(ReactNavigation.NavigationActions.back());

        return true;
    }

    isRootScreen(navigator) {
        if (typeof navigator.index == 'undefined') return true;

        let isCurrentRoot = navigator.index == 0;

        if (navigator.routes && navigator.routes.length > 0) {
            let allChildAreRoots = true;

            navigator.routes.map((r) => {
                if (allChildAreRoots) {
                    if (!this.isRootScreen(r)) {
                        allChildAreRoots = false;
                    }
                }
            });

            return allChildAreRoots && isCurrentRoot;
        }

        return isCurrentRoot;
    }
}

function mapStateToProps(state) {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        nav: state.nav,
    };
}

function mapDispatchToProps(dispatch) {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AppWithNavigationState);