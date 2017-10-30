import React, { Component } from 'react'
import * as ReactNavigation from 'react-navigation'
import { connect } from 'react-redux'
import { default as AppNavigation } from './TabView'
// import { default as AppNavigation } from './stackNavigation';
import { BackHandler, Platform } from 'react-native'


class ReduxNavigation extends Component {

    componentDidMount() {
        if (Platform.OS === 'android') {
            BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
        }

    }
    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
        }
    }

    onBackPress = () => {
        const { dispatch, nav } = this.props;
        if (this.isRootScreen(nav)) return false;

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

    render() {
        const { dispatch, nav } = this.props
        const navigation = ReactNavigation.addNavigationHelpers({
            dispatch,
            state: nav
        })
        return <AppNavigation navigation={navigation} />
    }
}
const mapStateToProps = state => ({ nav: state.nav })
export default connect(mapStateToProps)(ReduxNavigation)