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
import { getItem, setItem } from '../../../services/storageService';
import { storageKey } from '../env';
import Form from './components/Form';
import Section from './components/Section';
import KeyValueRow from './components/KeyValueRow';

export default class Server extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    let headerTitle = translate('ChangeServer');
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
      server: null,
      port: null,
      https: false,
      pending: false,
      isEditMode: false,
    };
  }

  async componentDidMount() {
    var that = this;
    const { navigation } = that.props;
    // We can only set the function after the component has been initialized
    navigation.setParams({
      toggleEdit: that.toggleEdit.bind(that),
      isEditMode: that.state.isEditMode,
      cancel: that.cancel.bind(that),
    });

    const doc_server = await getItem(storageKey.DOCUMENT_SERVER);
    console.log('server: ', doc_server)
    that.setState({
      ...doc_server,
    })
  }

  render() {
    return (
      <Form>
        {this.renderAdvancedPanel()}
      </Form>

    );
  }

  // edit
  toggleEdit = () => {
    const { navigation } = this.props;
    const isEditMode = this.state.isEditMode;

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
        onChangeText={(port) => {
          let newValue = port.replace('/[^\d]+/', '');
          newValue = newValue - 0; // convert string to int 
          this.setState({ port: newValue })
        }}
        value={`${this.state.port}`}
        autoCapitalize='none'
        editable={this.state.isEditMode}
        returnKeyType='next'
        keyboardType='numeric'
      />
    )
  }

  renderAdvancedPanel = () => {
    return (
      <Section title='ADVANCED'>
        <KeyValueRow title={translate('ServerAddress')}>
          {this.renderServerAddress()}
        </KeyValueRow>
        {this.renderSpacer()}
        <KeyValueRow title={translate('HTTPS')}>
          {this.renderHTTPS()}
        </KeyValueRow>
        {this.renderSpacer()}
        <KeyValueRow title={translate('Port')}>
          {this.renderPort()}
        </KeyValueRow>
      </Section>
    );
  }

  renderSpacer() {
    return (
      <View style={styles.spacer}></View>
    )
  }

  handleSave = () => {
    let _that = this;

    let server = _that.state.server;
    let https = _that.state.https;
    let port = _that.state.port;
    let host = {
      server,
      https,
      port
    };

    if (host) {
      _that.refs.txtServerAddress.blur();
      _that.refs.txtHTTPS.blur();
      _that.refs.txtPort.blur();
      setItem(storageKey.DOCUMENT_SERVER, { server, https, port });
      this.setState({ pending: false });
      Alert.alert('Account setting', 'Saved!', [{ text: 'OK', onPress: () => console.log('OK Pressed') },], { cancelable: false });
    }
  }

  renderPending = (data) => {
    if (this.state.pending === true) {
      return (
        <Spinner style={ComponentStyles.pending_container} />
      )
    }
  }
}

const styles = StyleSheet.create({
  spacer: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'gray',
    marginLeft: 10,
    marginRight: 10,
  },
})
