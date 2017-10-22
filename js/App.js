
import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet, StatusBar, Platform, BackHandler } from 'react-native'
import TabView from './TabView'
import colors from './common/colors'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import codePush from "react-native-code-push";
import { DrawerNavigator, StackNavigator, addNavigationHelpers, NavigationActions } from 'react-navigation';
import { Provider, connect } from 'react-redux';
import * as Views from './views'

import Routes from './config/routes'

import getStore from './config/store'

const HomeStackView = StackNavigator({
    Home: {
        screen: Views.Home,
        navigationOptions: stackNavigationOptions()
    }
});

const DocumentsStackView = StackNavigator({
    Documents: {
        screen: Views.Documents,
        navigationOptions: stackNavigationOptions()
    }
});

// const Navigator = StackNavigator(Routes, {
//     headerMode: 'screen'
// })

// var Navigator = () => (<TabView
//     navigation={addNavigationHelpers({
//         dispatch: this.props.dispatch,
//         state: this.props.nav
//     })} />);

function drawerViewNavigationOptions(label: string, iconName: string) {
    return {
        drawerLabel: label,
        drawerIcon: ({ tintColor }) => (
            <MaterialIcons
                name={iconName}
                size={24}
                style={{ color: tintColor }}
                accessibilityLabel={label}
            />
        )
    }
}

const styles = StyleSheet.create({
  hamburgerButton: {
    marginLeft: 14
  }
})

function stackNavigationOptions() {
  return ({ navigation }: { navigation: any }) => ({
    headerStyle: { backgroundColor: colors.primary },
    headerTintColor: colors.textOnPrimary,
    ...Platform.select({
      android: {
        headerLeft: (
          <TouchableOpacity
            style={styles.hamburgerButton}
            onPress={() => navigation.navigate('DrawerOpen')}
            accessibilityLabel='menu'
          >
            <MaterialIcons
              name='menu'
              size={24}
              style={{ color: colors.textOnPrimary }}
            />
          </TouchableOpacity>
        )
      }
    })
  })
}

const stackRoutes = {
    Home: {
        screen: HomeStackView,
        navigationOptions: drawerViewNavigationOptions('Home', 'home')
    },
    Documents: {
        screen: DocumentsStackView,
        navigationOptions: drawerViewNavigationOptions('Documents', 'cloud')
    }
};

const Navigator = StackNavigator(stackRoutes, {
    headerMode: 'screen',
    initialRouteName: 'Home',
    drawerWidth: 250,
    contentOptions: {
      activeTintColor: colors.textOnPrimary,
      activeBackgroundColor: colors.primary,
      inactiveTintColor: colors.primary
    }
})

const navReducer = (state, action) => {
    const newState = Navigator.router.getStateForAction(action, state)
    return newState || state
}

let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME };

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: 0
        }
    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);

        codePush.sync({
            updateDialog: true,
            mandatoryInstallMode: codePush.InstallMode.IMMEDIATE
        });
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

    render() {
        StatusBar.setBarStyle('light-content')

        if (Platform.OS === 'android') {
            StatusBar.setBackgroundColor(colors.primary)
        }

        return (
            // <TabView
            //     navigation={addNavigationHelpers({
            //         dispatch: this.props.dispatch,
            //         state: this.props.nav
            //     })} />
            // <TabView />
            <Navigator
                navigation={addNavigationHelpers({
                    dispatch: this.props.dispatch,
                    state: this.props.nav
                })}
            />
        )
    }
}


// export default App;

const store = getStore(navReducer);
const AppIndex = connect(state => ({ nav: state.nav }))(App)

export default App = () => {
    return (
        <Provider store={store}>
            <AppIndex />
        </Provider>
    )
}
App = codePush(codePushOptions)(App);
