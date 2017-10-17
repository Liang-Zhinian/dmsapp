import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native'
import Spinner from './components/spinner';
import { StyleConfig, ComponentStyles, CommonStyles } from './style'
import { JSEncrypt } from './common/jsencrypt'
import Config, { authData, storageKey } from './config/'
import * as ConfigAction from './action/config'

export default class AccountView extends Component {
  static navigationOptions = {
    headerTitle: 'Account'
  }


  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      pending: false
    };
  }

  componentDidMount() {
    let data = ConfigAction.getConfig(storageKey.USER_TOKEN);
    this.setState({ "username": data.username });
    this.setState({ "password": data.password });
  }

  encryptData(data) {
    let encrypt = new JSEncrypt({
      default_key_size: 1024,
      default_public_exponent: '010001'
    });
    encrypt.setPublicKey(authData.pubKey);
    return encrypt.encrypt(data);
  }

  renderUserName() {
    return (
      <View style={[ComponentStyles.input_control]}>
        <TextInput
          ref="txtUserName"
          style={[ComponentStyles.input]}
          placeholderTextColor={StyleConfig.color_gray}
          placeholder={'User name'}
          blurOnSubmit={true}
          underlineColorAndroid={'transparent'}
          onChangeText={(val) => this.setState({ username: val })}
          value={this.state.username} />
      </View>
    )
  }

  renderPassword() {
    return (
      <View style={[ComponentStyles.input_control]}>
        <TextInput
          ref="txtPassword"
          style={[ComponentStyles.input]}
          placeholderTextColor={StyleConfig.color_gray}
          placeholder={'Password'}
          blurOnSubmit={true}
          underlineColorAndroid={'transparent'}
          onChangeText={(val) => this.setState({ password: val })}
          value={this.state.password} />
      </View>
    )
  }

  renderSaveButton() {
    return (
      <TouchableOpacity
        activeOpacity={StyleConfig.touchable_press_opacity}
        style={[ComponentStyles.btn, ComponentStyles.btn_primary]}
        onPress={() => this.handleSave()}>
        <Text style={ComponentStyles.btn_text}>
          Save
        </Text>
      </TouchableOpacity>
    )
  }
  renderFormPanel() {
    return (
      <View style={[CommonStyles.m_a_4]}>
        {this.renderUserName()}
        {this.renderPassword()}
        {this.renderButtons()}
      </View>
    );
  }

  renderButtons() {
    return (
      <View style={[CommonStyles.flexRow, CommonStyles.flexItemsMiddle, CommonStyles.flexItemsBetween, CommonStyles.m_t_4]}>
        {this.renderSaveButton()}
      </View>
    )
  }

  accountValidator() {
    let username = this.state.username;
    let password = this.state.password;
    //username = this.encryptData(username);
    //password = this.encryptData(password);
    return {
      username,
      password
    };
  }

  handleSave() {
    const accountData = this.accountValidator();
    if (accountData) {
      this.refs.txtUserName.blur();
      this.refs.txtPassword.blur();
      this.setState({ pending: true });
      let data = {};
      data.username = accountData.username;
      data.password = accountData.password;
      this.handleAccountResolved(data);
    }
  }

  handleAccountResolved(data) {
    ConfigAction.updateConfig(storageKey.USER_TOKEN, data);
    this.setState({ pending: false });
    Alert.alert('Account setting', 'Saved!', [{ text: 'OK', onPress: () => console.log('OK Pressed') },], { cancelable: false });
  }

  handleAccountRejected(data) {
    this.setState({ pending: false });
    Alert.alert('Account setting', 'Failed!', [{ text: 'OK', onPress: () => console.log('OK Pressed') },], { cancelable: false });
  }

  renderPending() {
    if (this.state.pending === true) {
      return (
        <Spinner style={ComponentStyles.pending_container} />
      )
    }
  }

  render() {
    return (
      <View>
        <ScrollView
          keyboardShouldPersistTaps={'always'}>
          {this.renderFormPanel()}
        </ScrollView>
        {this.renderPending()}
      </View>

    );
  }
}