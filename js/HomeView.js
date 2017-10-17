import React, {Component} from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default class HomeView extends Component {
    static navigationOptions = {
      headerTitle: 'Home'
    }
  
    render () {
      return <View>
          <Text>Welcome!</Text>
      </View>
    }
  }