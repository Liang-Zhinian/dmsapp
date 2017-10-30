import React, { Component } from 'react'
import {
    StatusBar,
    Platform,
    View,
    Text
} from 'react-native'
import Navigation from './navigations/ReduxNavigation'
import colors from './common/colors'
import { home } from './modules'

class App extends Component {

    render() {
        StatusBar.setBarStyle('light-content')

        if (Platform.OS === 'android') {
            StatusBar.setBackgroundColor(colors.primary)
        }

        return (
            <Navigation />
        )
    }
}

export default App