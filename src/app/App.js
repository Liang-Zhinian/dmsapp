/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';

import {createRootNavigator} from './navigators/index';

class App extends Component<{}> {
    render() {
        const Layout = createRootNavigator(this.props.isLoggedIn);
        return (
            <Layout />
        );
    }
}

// 获取 state 变化
const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
    }
};

// 发送行为
const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    {
        withRef: true
    }
)(App);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
