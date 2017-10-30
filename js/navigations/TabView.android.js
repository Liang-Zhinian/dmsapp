
import React from 'react'
import { ScrollView } from 'react-native';
import { DrawerNavigator } from 'react-navigation'
import colors from '../common/colors'
import DrawerContentComponent from './DrawerContentComponent'
import { drawerViewNavigationOptions } from './navigationOptions'
import * as modules from '../modules';
import { HomeStack, MoreStack } from './stackNavigation'

const TabView = DrawerNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: drawerViewNavigationOptions('Home', 'home')
    },
    Documents: {
      screen: modules.documents.Navigation,
      navigationOptions: drawerViewNavigationOptions('Documents', 'cloud')
    },
    More: {
      screen: modules.more.App,
      navigationOptions: drawerViewNavigationOptions('More', 'more-horiz')
    }
  },
  {
    gesturesEnabled: false,
    headerMode: 'screen',
    initialRouteName: 'Home',
    drawerWidth: 250,
    contentComponent: DrawerContentComponent,
    contentOptions: {
      activeTintColor: colors.textOnPrimary,
      activeBackgroundColor: colors.primary,
      inactiveTintColor: colors.primary
    }
  }
)

export default TabView
