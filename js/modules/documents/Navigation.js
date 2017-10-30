
import React from 'react'
import { StackNavigator, TabNavigator } from 'react-navigation'
import { stackNavigationOptions, stackNavigationOptionsWithDrawerButton } from '../../navigations/navigationOptions'

import App from './components/DocumentsView'
import DocumentsDetailsView from './components/DocumentsDetailsView'
import SearchView from './components/SearchView'
import DownloadsView from './components/DownloadsView'
import AccountView from './components/accounts'
import DocumentsPreviewView from './components/DocumentsPreviewView'

export default Navigation = StackNavigator({
    Documents: {
        screen: App,
        // navigationOptions: stackNavigationOptions()
    },
    DocumentsPreview: {
        screen: DocumentsPreviewView,
        // navigationOptions: stackNavigationOptions()
    },
    DocumentsDetails: {
        screen: DocumentsDetailsView,
        // navigationOptions: stackNavigationOptions()
    },
    Search: {
        screen: SearchView,
        // navigationOptions: stackNavigationOptions()
    },
    Downloads: {
        screen: DownloadsView,
        // navigationOptions: stackNavigationOptions()
    },
    Account: {
        screen: AccountView,
        // navigationOptions: stackNavigationOptions()
    },
},
{
    initialRouteName: 'Documents',
    navigationOptions: stackNavigationOptions()
});