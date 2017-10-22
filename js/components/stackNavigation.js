/**
 * MIT License
 *
 * Copyright (c) 2017 johnwakley
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

// @flow

import React from 'react'
import { TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { StackNavigator } from 'react-navigation'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import colors from '../common/colors'
import HomeView from '../views/HomeView'
import DocumentsView from '../views/DocumentsView'
import AccountView from '../views/AccountView'
import AboutView from '../views/AboutView'
import SearchView from '../views/SearchView'
import DownloadsView from '../views/DownloadsView'
import SettingsView from '../views/SettingsView'


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

export const HomeStackView = StackNavigator({
  Home: {
    screen: HomeView,
    navigationOptions: stackNavigationOptions()
  }
});

export const DocumentsStackView = StackNavigator({
  Documents: {
    screen: DocumentsView,
    navigationOptions: stackNavigationOptions()
  }/*,
  RepoDetail: {
    screen: RepoDetailView,
    navigationOptions: stackNavigationOptions()
  }*/
},
  {
    headerMode: 'screen',
    initialRouteName: 'Documents'
  });

export const AccountStackView = StackNavigator({
  Account: {
    screen: AccountView,
    navigationOptions: stackNavigationOptions()
  }
});

export const SettingsStackView = StackNavigator({
  Settings: {
    screen: SettingsView,
    navigationOptions: stackNavigationOptions()
  }
});

export const DownloadsStackView = StackNavigator({
  Downloads: {
    screen: DownloadsView,
    navigationOptions: stackNavigationOptions()
  }
});

export const SearchStackView = StackNavigator({
  Search: {
    screen: SearchView,
    navigationOptions: stackNavigationOptions()
  }
});

export const AboutStackView = StackNavigator({
  About: {
    screen: AboutView,
    navigationOptions: stackNavigationOptions()
  }
});
