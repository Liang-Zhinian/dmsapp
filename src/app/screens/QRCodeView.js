'use strict';
 
import React, { Component } from 'react'
import QRCode from 'react-native-qrcode';
 
import {
    AppRegistry,
    StyleSheet,
    View,
    TextInput
} from 'react-native';
 
export default class QRCodeView extends Component {
 
  render() {
    return (
      <View style={styles.container}>
        <QRCode
          value={this.props.text}
          size={this.props.size}
          bgColor='purple'
          fgColor='white'/>
      </View>
    );
  };
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
});
 