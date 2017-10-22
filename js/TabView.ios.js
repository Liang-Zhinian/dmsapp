
import React from 'react'
import {TabNavigator} from 'react-navigation'
import colors from './common/colors'
import {HomeStackView, DocumentsStackView, AccountStackView} from './components/stackNavigation'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

function tabNavigationOptions (label: string, iconName: string) {
  return {
    tabBarLabel: label,
    tabBarIcon: ({tintColor}) => (
      <MaterialIcons
        name={iconName}
        size={26}
        style={{color: tintColor}}
        accessibilityLabel={label}
      />
    )
  }
}

const TabView = TabNavigator(
  {
    Home: {
      screen: HomeStackView,
      navigationOptions: tabNavigationOptions('Home', 'home')
    },
    Documents: {
      screen: DocumentsStackView,
      navigationOptions: tabNavigationOptions('Documents', 'cloud')
    },
    Account: {
      screen: AccountStackView,
      navigationOptions: tabNavigationOptions('Account', 'account-box')
    },
    Search: {
      screen: SearchStackView,
      navigationOptions: tabNavigationOptions('Search', 'search')
    },
    Downloads: {
      screen: DownloadsStackView,
      navigationOptions: tabNavigationOptions('Downloads', 'cloud-download')
    },
    Settings: {
      screen: SettingsStackView,
      navigationOptions: tabNavigationOptions('Settings', 'settings')
    },
    About: {
      screen: AboutStackView,
      navigationOptions: tabNavigationOptions('About', 'info')
    }
  },
  {
    tabBarOptions: {
      activeTintColor: colors.primary
    }
  }
)

export default TabView
