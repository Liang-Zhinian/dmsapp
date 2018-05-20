import React, { Component } from 'react';
import { BackHandler, Platform, DeviceEventEmitter } from 'react-native';
import PropTypes from 'prop-types';
import {
  StackNavigator,
  addNavigationHelpers
} from 'react-navigation';

import AuthLoadingScreen from './screens/AuthLoadingScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import SignupScreen from './screens/Registration';
import { BottomTabs } from './navigators/navigation';

const MainScreen = BottomTabs;


export const SignedOut = StackNavigator({
  Login: {
    screen: LoginScreen,
  },
  Signup: {
    screen: SignupScreen,
    navigationOptions: {
      title: 'Sign Up'
    }
  }
}, {
    headerMode: 'none',
  });

export const SignedIn = StackNavigator(
  {
    Main: {
      screen: MainScreen,
    },
    Profile: {
      screen: ProfileScreen
    }
  }, {
    headerMode: 'none',
  }
);

export const createRootNavigator = (signedIn = false) => {
  return StackNavigator(
    {
      Splash: {
        screen: AuthLoadingScreen,
      },
      SignedIn: {
        screen: SignedIn,
        navigationOptions: {
          gesturesEnabled: false
        }
      },
      SignedOut: {
        screen: SignedOut,
        navigationOptions: {
          gesturesEnabled: false
        }
      },
    },
    {
      mode: 'modal',
      headerMode: 'none',
      initialRouteName: signedIn ? 'SignedIn' : 'SignedOut'
    }
  );
};

