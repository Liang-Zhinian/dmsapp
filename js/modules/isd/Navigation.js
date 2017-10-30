import React from 'react'
import { StackNavigator, TabNavigator } from 'react-navigation'
import { stackNavigationOptions, stackNavigationOptionsWithDrawerButton } from '../../navigations/navigationOptions'

import App from './App'
import IsdDashboardsExpensesView from './IsdDashboards-ExpensesView'
import IsdDashboardsUseView from './IsdDashboards-UseView'
import IsdReportsExpensesView from './IsdReports-ExpensesView'
import IsdReportsUseView from './IsdReports-UseView'

export default Navigation = StackNavigator(
    {
        ISD: {
            screen: App,
            // navigationOptions: stackNavigationOptions()
        },
        IsdDashboardsExpenses: {
            screen: IsdDashboardsExpensesView,
            // navigationOptions: stackNavigationOptions()
        },
        IsdDashboardsUse: {
            screen: IsdDashboardsUseView,
            // navigationOptions: stackNavigationOptions()
        },
        IsdReportsExpenses: {
            screen: IsdReportsExpensesView,
            // navigationOptions: stackNavigationOptions()
        },
        IsdReportsUse: {
            screen: IsdReportsUseView,
            // navigationOptions: stackNavigationOptions()
        },
    },
    {
        initialRouteName: 'ISD',
        headerMode: 'none',
        navigationOptions: stackNavigationOptions()
    });