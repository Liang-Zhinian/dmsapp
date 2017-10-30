
import React from 'react'
import { TabNavigator } from 'react-navigation'
import colors from '../common/colors'
import { tabNavigationOptions } from './navigationOptions'
import * as modules from '../modules';
import { HomeStack, MoreStack } from './stackNavigation'

const TabView = TabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: tabNavigationOptions('Home', 'home')
    },
    Documents: {
      screen: modules.documents.Navigation,
      navigationOptions: tabNavigationOptions('Documents', 'file-submodule')
    },
    More: {
      screen: modules.more.App,
      navigationOptions: tabNavigationOptions('More', 'kebab-horizontal')
    }
  },
  {
    headerMode: 'screen',
    tabBarPosition: 'bottom',
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: colors.primary
    }
  }
)

export default TabView
