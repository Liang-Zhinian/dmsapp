
import React from 'react'
import { StackNavigator, TabNavigator } from 'react-navigation'
import { stackNavigationOptions, stackNavigationOptionsWithDrawerButton } from '../../navigations/navigationOptions'

import App from './App'
import Expense2View from './Expense2View'

export default Navigation = StackNavigator({
    Expenses: {
        screen: App,
        // navigationOptions: stackNavigationOptions()
    },
    Expense2: {
        screen: Expense2View,
        // navigationOptions: stackNavigationOptions()
    },
},
{
    initialRouteName: 'Expenses',
    headerMode: 'none',
    navigationOptions: stackNavigationOptionsWithDrawerButton()
});