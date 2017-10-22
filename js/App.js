
import React, { Component } from 'react'
import { StatusBar, Platform, BackHandler } from 'react-native'
import TabView from './TabView'
import colors from './common/colors'
import codePush from "react-native-code-push";
import { addNavigationHelpers, NavigationActions } from 'react-navigation';
import { Provider, connect } from 'react-redux';

import store from './config/store';


let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME };

class ReduxNavigation extends React.Component {
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

    render() {
        const { dispatch, nav } = this.props;
        const navigation = addNavigationHelpers({
            dispatch,
            state: nav
        });

        return <TabView
            navigation={navigation} />
    }
}

const mapStateToProps = (state) => ({
    nav: state.nav
});

const AppWithNavigation = connect(mapStateToProps)(ReduxNavigation);



class App extends Component {
      constructor(props) {
        super(props);
        this.state = {
          progress: 0
        }
      }

      codePushStatusDidChange(status) {
        switch (status) {
          case codePush.SyncStatus.CHECKING_FOR_UPDATE:
            console.log('Checking for updates.');
            break;
          case codePush.SyncStatus.DOWNLOADING_PACKAGE:
            console.log('Downloading package.');
            break;
          case codePush.SyncStatus.INSTALLING_UPDATE:
            console.log('Installing update.');
            break;
          case codePush.SyncStatus.UP_TO_DATE:
            console.log('Up to date.');
            break;
          case codePush.SyncStatus.UPDATE_INSTALLED:
            console.log('Update installed.');
            break;
        }

      }

      codePushDownloadDidProgress(progress) {
        console.log(progress.receivedBytes + ' of ' + progress.totalBytes + ' received.');
      }

      componentDidMount() {
        codePush.sync({
          updateDialog: true,
          mandatoryInstallMode: codePush.InstallMode.IMMEDIATE
        });
      }


    render() {
        StatusBar.setBarStyle('light-content')

        if (Platform.OS === 'android') {
            StatusBar.setBackgroundColor(colors.primary)
        }

        return (
            // <Provider store={store}>
            //     <AppWithNavigation />
            // </Provider>
            <TabView />
        )
    }
}

App = codePush(codePushOptions)(App);

export default App;
