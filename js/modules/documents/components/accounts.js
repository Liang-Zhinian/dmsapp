import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import Spinner from '../../../components/spinner';
import { StyleConfig, ComponentStyles, CommonStyles } from '../../../style'
import { JSEncrypt } from '../../../common/jsencrypt'
import Config, { authData, storageKey } from '../../../config/'
import * as ConfigAction from '../../../actions/config'
import * as actions from '../actions'
import { NAME } from '../constants'

class App extends Component {
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
    var _that = this;
    const { username, password, sid, valid } = _that.props;
    _that.setState({
      username,
      password
    })
  }

  encryptData = (data) => {
    let encrypt = new JSEncrypt({
      default_key_size: 1024,
      default_public_exponent: '010001'
    });
    encrypt.setPublicKey(authData.pubKey);
    return encrypt.encrypt(data);
  }

  renderUserName = () => {
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
          value={this.props.username} />
      </View>
    )
  }

  renderPassword = () => {
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
          value={this.props.password} />
      </View>
    )
  }

  renderSessionId = () => {
    return (
      <View style={[ComponentStyles.input_control]}>
        <TextInput
          ref="txtSid"
          style={[ComponentStyles.input]}
          placeholderTextColor={StyleConfig.color_gray}
          placeholder={'Session Id'}
          blurOnSubmit={true}
          underlineColorAndroid={'transparent'}
          value={this.props.sid} />
      </View>
    )
  }

  renderSaveButton = () => {
    return (
      <TouchableOpacity
        activeOpacity={StyleConfig.touchable_press_opacity}
        style={[ComponentStyles.btn, { backgroundColor: '#8a8482' }]}
        onPress={() => this.handleSave()}>
        <Text style={ComponentStyles.btn_text}>
          Save
        </Text>
      </TouchableOpacity>
    )
  }
  renderFormPanel = () => {
    return (
      <View style={[CommonStyles.m_a_4]}>
        {this.renderUserName()}
        {this.renderPassword()}
        {this.renderSessionId()}
        {this.renderButtons()}
      </View>
    );
  }

  renderButtons = () => {
    return (
      <View style={[CommonStyles.flexRow, CommonStyles.flexItemsMiddle, CommonStyles.flexItemsBetween, CommonStyles.m_t_4]}>
        {this.renderSaveButton()}
      </View>
    )
  }

  accountValidator = () => {
    let username = this.state.username;
    let password = this.state.password;
    //username = this.encryptData(username);
    //password = this.encryptData(password);
    return {
      username,
      password
    };
  }

  handleSave = () => {
    let _that = this;
    const accountData = _that.accountValidator();
    if (accountData) {
      _that.refs.txtUserName.blur();
      _that.refs.txtPassword.blur();
      // _that.setState({ pending: true });

      const { login } = _that.props;
      login(
        accountData.username,
        accountData.password)

      this.setState({ pending: false });
      Alert.alert('Account setting', 'Saved!', [{ text: 'OK', onPress: () => console.log('OK Pressed') },], { cancelable: false });
      // _that.setState({ sid: sid });

      // _that.props.login({
      //   username: accountData.username,
      //   password: accountData.password,
      //   resolved: (data)=>{
      //       // this.handleLoginResolved(data);
      //       _that.setState({ sid: data });
      //   },
      //   rejected: (data)=>{
      //     _that.handleLoginRejected(data);
      //   }
      // });


      // let data = {};
      // data.username = accountData.username;
      // data.password = accountData.password;
      // _that.handleAccountResolved(data);
    }
  }

  handleAccountResolved = (data) => {
    let backup = ConfigAction.getConfig(storageKey.USER_TOKEN);
    if (!!backup) {
      ConfigAction.updateConfig(storageKey.USER_TOKEN, data);
    } else {
      ConfigAction.setConfig(storageKey.USER_TOKEN, data);
    }

    this.setState({ pending: false });
    Alert.alert('Account setting', 'Saved!', [{ text: 'OK', onPress: () => console.log('OK Pressed') },], { cancelable: false });
  }

  handleAccountRejected = (data) => {
    this.setState({ pending: false });
    Alert.alert('Account setting', 'Failed!', [{ text: 'OK', onPress: () => console.log('OK Pressed') },], { cancelable: false });
  }

  renderPending = (data) => {
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

// 获取 state 变化
const mapStateToProps = (state) => {
  return {
    // 获取 state 变化
    isLoggedIn: state[NAME].isLoggedIn,
    username: state[NAME].username,
    password: state[NAME].password,
    sid: state[NAME].sid
  }
};

// 发送行为
const mapDispatchToProps = (dispatch) => {
  return {
    // 发送行为
    login: (username, password) => dispatch(actions.login(username, password)),
    // valid: (sid) => dispatch(actions.valid(sid)),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    withRef: true
  }
)(App);
