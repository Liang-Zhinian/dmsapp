
import React from 'react'
import { DrawerNavigator } from 'react-navigation'
import colors from './common/colors'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { HomeStackView, DocumentsStackView, AccountStackView, DownloadsStackView, AboutStackView, SearchStackView, SettingsStackView } from './components/stackNavigation'
// import DocumentsNavigation from './navigations/documents'

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

const TabView = DrawerNavigator(
  {
    Home: {
      screen: HomeStackView,
      navigationOptions: drawerViewNavigationOptions('Home', 'home')
    },
    Documents: {
      screen: DocumentsStackView,
      navigationOptions: drawerViewNavigationOptions('Documents', 'cloud')
    },
    Search: {
      screen: SearchStackView,
      navigationOptions: drawerViewNavigationOptions('Search', 'search')
    },
    Downloads: {
      screen: DownloadsStackView,
      navigationOptions: drawerViewNavigationOptions('Downloads', 'cloud-download')
    },
    Account: {
      screen: AccountStackView,
      navigationOptions: drawerViewNavigationOptions('Account', 'account-circle')
    },
    Settings: {
      screen: SettingsStackView,
      navigationOptions: drawerViewNavigationOptions('Settings', 'settings')
    },
    About: {
      screen: AboutStackView,
      navigationOptions: drawerViewNavigationOptions('About', 'info')
    }
  },
  {
    headerMode: 'screen',
    initialRouteName: 'Home',
    drawerWidth: 250,
    contentOptions: {
      activeTintColor: colors.textOnPrimary,
      activeBackgroundColor: colors.primary,
      inactiveTintColor: colors.primary
    }
  }
)

export default TabView
