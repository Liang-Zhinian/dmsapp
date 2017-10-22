'use strict';

import * as Views from '../views'

const Routes = {
    Home: {
        screen: Views.Home,
        // navigationOptions: drawerViewNavigationOptions('Home', 'home')
    },
    Documents: {
        screen: Views.Documents,
        // navigationOptions: drawerViewNavigationOptions('Documents', 'cloud')
    },
    Search: {
        screen: Views.Search,
        // navigationOptions: drawerViewNavigationOptions('Search', 'search')
    },
    Downloads: {
        screen: Views.Downloads,
        // navigationOptions: drawerViewNavigationOptions('Downloads', 'cloud-download')
    },
    Account: {
        screen: Views.Account,
        // navigationOptions: drawerViewNavigationOptions('Account', 'account-circle')
    },
    Settings: {
        screen: Views.Settings,
        // navigationOptions: drawerViewNavigationOptions('Settings', 'settings')
    },
    About: {
        screen: Views.About,
        // navigationOptions: drawerViewNavigationOptions('About', 'info')
    }
}

export default Routes