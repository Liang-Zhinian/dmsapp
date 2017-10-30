
import React from 'react'
import { StackNavigator, TabNavigator } from 'react-navigation'
import { stackNavigationOptions, stackNavigationOptionsWithDrawerButton } from './navigationOptions'
import * as modules from '../modules';

export const HomeStack = StackNavigator(
  {
    Home: {
      screen: modules.home.App,
      navigationOptions: stackNavigationOptionsWithDrawerButton()
    },
    Search: {
      screen: modules.documents.Views.Search,
    },
    Downloads: {
      screen: modules.documents.Views.Downloads,
    },
    Account: {
      screen: modules.documents.Views.Account,
    },
    Settings: {
      screen: modules.settings.App,
    },
    Expenses: {
      screen: modules.expenses.Navigation,
      navigationOptions: stackNavigationOptionsWithDrawerButton()
    },
    ISD: {
      screen: modules.isd.Navigation,
      navigationOptions: stackNavigationOptionsWithDrawerButton()
    },
    Helpdesk: {
      screen: modules.helpdesk.App,
      navigationOptions: stackNavigationOptionsWithDrawerButton()
    },
  },
  {
    navigationOptions: stackNavigationOptionsWithDrawerButton()
  });



