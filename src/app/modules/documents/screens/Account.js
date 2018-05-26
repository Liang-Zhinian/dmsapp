import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Switch,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { CommonStyles } from '../styles';
import * as actions from '../actions';
import { NAME } from '../constants';
import { HeaderButton } from './components/HeaderButtons';
import { translate } from '../../../i18n/i18n';
import { getItem } from '../../../services/storageService';
import { storageKey } from '../env';

class Account extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    let headerTitle = translate('ManageAccount');
    let headerLeft = (
      <View style={[
        CommonStyles.flexRow,
        CommonStyles.m_l_2,
      ]}>
        <HeaderButton
          onPress={params.cancel ? params.cancel : () => null}
          text={translate('Cancel')}
        />
      </View>
    );
    let headerRight = (
      <View style={[
        CommonStyles.flexRow,
      ]}>
        <HeaderButton
          onPress={params.toggleEdit ? params.toggleEdit : () => null}
          text={translate(!params.isEditMode ? 'Edit' : 'Save')}
        />
      </View>
    );

    const withCancelButton = { headerLeft, headerTitle, headerRight };
    const withoutCancelButton = { headerTitle, headerRight };

    return params.isEditMode ? withCancelButton : withoutCancelButton;
    // return { headerLeft, headerTitle, headerRight }
  };


  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      server: null,
      port: null,
      https: false,
      pending: false,
      isEditMode: false,
    };
  }

  async componentDidMount() {
    console.log('componentDidMount');
    var that = this;
    const { navigation } = that.props;
    // We can only set the function after the component has been initialized
    navigation.setParams({
      toggleEdit: that.toggleEdit.bind(that),
      isEditMode: that.state.isEditMode,
      cancel: that.cancel.bind(that),
    });

    const { username, password, sid, valid } = that.props;

    const doc_server = await getItem(storageKey.DOCUMENT_SERVER);

    that.setState({
      username,
      password,
      ...doc_server,
    })
  }

  render() {
    return (
      //<View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          justifyContent: 'center',
          //alignItems: 'flex-start',
        }}
        style={styles.container}
        keyboardShouldPersistTaps={'always'}>
        <View style={{
          flex: 1,
          marginTop: 20,
          marginRight: 0,
          marginBottom: 0,
          //marginLeft: 10,
        }}>
          <Text style={{ marginLeft: 10, fontSize: 14, color: 'grey' }}>ACCOUNT AUTHENTICATION</Text>
          {this.renderAccountAuthenticationPanel()}
        </View>
        {this.renderPending()}
        <View style={{
          flex: 1,
          marginTop: 20,
          marginRight: 0,
          marginBottom: 0,
          //marginLeft: 10,
        }}>
          <Text style={{ marginLeft: 10, fontSize: 14, color: 'grey' }}>ADVANCED</Text>
          {this.renderAdvancedPanel()}
        </View>
      </ScrollView>
      //</View>

    );
  }

  // edit
  toggleEdit = () => {
    const { navigation } = this.props;
    const isEditMode = this.state.isEditMode;

    if (isEditMode) {
      this.handleSave();
    } else {
      this.refs.txtUserName.focus();
      this.refs.txtUserName.selection = { start: 3, end: 3 };
      //Alert.alert('UserName focused', 'Focused!', [{ text: 'OK', onPress: () => console.log('OK Pressed') },], { cancelable: false });

    }

    this.setState({
      isEditMode: !isEditMode
    });
    navigation.setParams({
      isEditMode: !isEditMode
    });
  }

  cancel = () => {
    const { navigation } = this.props;

    this.setState({
      isEditMode: false
    });
    navigation.setParams({
      isEditMode: false
    });
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
      <TextInput
        ref="txtUserName"
        style={[ComponentStyles.input]}
        placeholderTextColor={StyleConfig.color_gray}
        placeholder={translate('UserName')}
        blurOnSubmit={true}
        underlineColorAndroid={'transparent'}
        onChangeText={(username) => this.setState({ username })}
        value={this.state.username}
        autoCapitalize='none'
        editable={this.state.isEditMode}
        returnKeyType='next'
      />
    )
  }

  renderPassword = () => {
    return (
      <TextInput
        ref="txtPassword"
        style={[ComponentStyles.input]}
        placeholderTextColor={StyleConfig.color_gray}
        placeholder={translate('Password')}
        blurOnSubmit={true}
        underlineColorAndroid={'transparent'}
        onChangeText={(password) => this.setState({ password })}
        value={this.state.password}
        autoCapitalize='none'
        editable={this.state.isEditMode}
      /* secureTextEntry={true} */
      />
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

  renderLogoutButton = () => {
    return (
      <TouchableOpacity
        activeOpacity={StyleConfig.touchable_press_opacity}
        style={[ComponentStyles.btn, { backgroundColor: '#8a8482' }]}
        onPress={() => this.handleLogout()}>
        <Text style={ComponentStyles.btn_text}>
          {translate('SignOut')}
        </Text>
      </TouchableOpacity>
    )
  }

  renderServerAddress = () => {
    return (
      <TextInput
        ref="txtServerAddress"
        style={[ComponentStyles.input]}
        placeholderTextColor={StyleConfig.color_gray}
        placeholder={translate('ServerAddress')}
        blurOnSubmit={true}
        underlineColorAndroid={'transparent'}
        onChangeText={(server) => this.setState({ server })}
        value={this.state.server}
        autoCapitalize='none'
        editable={this.state.isEditMode}
        returnKeyType='next'
      />
    )
  }

  renderHTTPS = () => {
    if (this.state.isEditMode)
      return (
        <Switch
          ref="txtHTTPS"
          value={this.state.https}
          onValueChange={(value) => {
            this.setState({
              https: value
            });
          }} />
      )
    return (
      <TextInput
        ref="txtHTTPS"
        style={[ComponentStyles.input]}
        placeholderTextColor={StyleConfig.color_gray}
        placeholder={translate('HTTPS')}
        blurOnSubmit={true}
        underlineColorAndroid={'transparent'}
        onChangeText={(https) => this.setState({ https })}
        value={translate(this.state.https ? 'On' : 'Off')}
        autoCapitalize='none'
        editable={false}
        returnKeyType='next'
      />

    )
  }

  renderPort = () => {
    return (
      <TextInput
        ref="txtPort"
        style={[ComponentStyles.input]}
        placeholderTextColor={StyleConfig.color_gray}
        placeholder={translate('Port')}
        blurOnSubmit={true}
        underlineColorAndroid={'transparent'}
        onChangeText={(port) => this.setState({ port })}
        value={this.state.port}
        autoCapitalize='none'
        editable={this.state.isEditMode}
        returnKeyType='next'
      />
    )
  }

  renderAccountAuthenticationPanel = () => {
    return (
      <View style={[styles.section]}>
        <View style={[{ flex: 1 }, styles.row]}>
          <Text style={[styles.title]}>{translate('UserName')}</Text>
          <View style={[styles.content]}>{this.renderUserName()}</View>
        </View>
        {this.renderSpacer()}
        <View style={[{ flex: 1 }, styles.row]}>
          <Text style={[styles.title]}>{translate('Password')}</Text>
          <View style={[styles.content]}>{this.renderPassword()}</View>
        </View>
      </View>
    );
  }

  renderAdvancedPanel = () => {
    return (
      <View style={[styles.section]}>
        <View style={[{ flex: 1 }, styles.row]}>
          <Text style={[styles.title]}>{translate('ServerAddress')}</Text>
          <View style={[styles.content]}>{this.renderServerAddress()}</View>
        </View>
        {this.renderSpacer()}
        <View style={[{ flex: 1 }, styles.row]}>
          <Text style={[styles.title]}>{translate('HTTPS')}</Text>
          <View style={[styles.content]}>{this.renderHTTPS()}</View>
        </View>
        {this.renderSpacer()}
        <View style={[{ flex: 1 }, styles.row]}>
          <Text style={[styles.title]}>{translate('Port')}</Text>
          <View style={[styles.content]}>{this.renderPort()}</View>
        </View>
      </View>
    );
  }

  renderSpacer() {
    return (
      <View style={styles.spacer}></View>
    )
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
    let server = this.state.server;
    let https = this.state.https;
    let port = this.state.port;
    return {
      username,
      password,
      server,
      https,
      port
    };
  }

  handleSave = () => {
    let _that = this;
    const accountData = _that.accountValidator();
    if (accountData) {
      _that.refs.txtUserName.blur();
      _that.refs.txtPassword.blur();
      _that.refs.txtServerAddress.blur();
      _that.refs.txtHTTPS.blur();
      _that.refs.txtPort.blur();

      const { saveAccount, login } = _that.props;
      saveAccount(
        accountData.username,
        accountData.password,
        accountData.server,
        accountData.https,
        accountData.port,
      );

      this.setState({ pending: false });
      Alert.alert('Account setting', 'Saved!', [{ text: 'OK', onPress: () => console.log('OK Pressed') },], { cancelable: false });
    }
  }

  handleLogout = () => {
    const { sid, logout, navigation } = this.props;
    logout(sid, navigation);
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
}

// 获取 state 变化
const mapStateToProps = (state) => {
  return {
    // 获取 state 变化
    isLoggedIn: state[NAME].account.isLoggedIn,
    username: state[NAME].account.username,
    password: state[NAME].account.password,
    // server: state[NAME].account.server,
    // https: state[NAME].account.https,
    // port: state[NAME].account.port,
    sid: state[NAME].account.token.sid
  }
};

// 发送行为
const mapDispatchToProps = (dispatch) => {
  return {
    // 发送行为
    login: (username, password) => dispatch(actions.login(username, password)),
    logout: (sid, navigation) => dispatch(actions.logout(sid, navigation)),
    saveAccount: (username, password, server, https, port) => dispatch(actions.saveAccount(username, password, server, https, port)),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    withRef: true
  }
)(Account);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'flex-start',
    // width: null,
    // height: null,
    backgroundColor: '#F5FCFF',
  },
  section: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 10,
    marginRight: 0,
    marginBottom: 20,
    marginLeft: 0,
    borderTopWidth: 1,
    borderTopColor: 'gray',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  row: {
    flexDirection: 'row',
    padding: 10,
    // marginRight: 10,
    // marginLeft: 10,
    backgroundColor: '#ffffff',
    // borderBottomWidth: 1,
    // borderBottomColor: 'gray',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    // marginRight: 10,
    fontWeight: 'bold',
    textAlign: 'right',
    fontSize: 17,
  },
  content: {
    flex: 1,
    marginLeft: 10,
  },
  spacer: {
    height: 1,
    backgroundColor: 'gray',
    marginLeft: 10,
    marginRight: 10,
  },
})
