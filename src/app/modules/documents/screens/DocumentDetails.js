import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  ScrollView,
  Button,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux'
import moment from 'moment'
import { StyleConfig, ComponentStyles, CommonStyles } from '../styles'
import { NAME } from '../constants'
import * as actions from '../actions';
import Form from './components/Form';
import Section from './components/Section';
import KeyValueRow from './components/KeyValueRow';
import { translate } from '../../../i18n/i18n';
import { HeaderButton } from './components/HeaderButtons';
import configureNavigationOptions from './components/EditableNavigationOptions';


class Dot extends Component {
  render() {
    return <TouchableOpacity onPress={this.props.onPress}>
      <View style={[{ width: 100, height: 60, backgroundColor: this.props.backgroundColor }, this.props.style]}></View>
    </TouchableOpacity>
  }

}

class DocumentDetails extends Component {

  static defaultProps = {
    data: {},
  };


  static navigationOptions = configureNavigationOptions();

  constructor(props) {
    super(props);
    this.state = {
      workflowMessage: '',
      isEditMode: false,
      workflowStatus: 'Running'
    }

    this.bootstrap();
  }

  bootstrap() {
    var that = this;
    const { navigation } = that.props;
    // We can only set the function after the component has been initialized

    let headerTitle = 'Document';

    if (typeof navigation.state.params !== 'undefined') {
      this.data = Object.assign({}, navigation.state.params.node);
      headerTitle = this.data.name || this.data.fileName;
    }

    navigation.setParams({
      toggleEdit: that.toggleEdit.bind(that),
      isEditMode: that.state.isEditMode,
      cancel: that.cancel.bind(that),
      title: headerTitle,
      isEditable: this.data.type !== 1
    });

  }

  componentDidMount() {

    this.setState({ ...this.data }, () => {
    });
  }

  render() {
    return (
      <Form>
        {this.renderGeneralSection()}
        {this.renderDetailsSection()}
        {!this.isFolder() && this.renderWorkflowSection()}
      </Form >
    )
  }

  isFolder = () => {
    return [0, 1].indexOf(this.data.type) >= 0;
  }

  // edit
  toggleEdit = () => {
    const { navigation } = this.props;
    const isEditMode = this.state.isEditMode;

    if (isEditMode) {
      this.handleSave();
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

  handleSave = () => {
    const { username, password, updateDocument, updateFolder } = this.props;

    if (!this.isFolder()) {

      updateDocument(username, password, this.data);
    } else {
      updateFolder(username, password, this.data);
    }
  }

  renderNameInput = () => {
    return (
      <TextInput
        ref="txtName"
        style={[styles.input]}
        placeholderTextColor={StyleConfig.color_gray}
        placeholder={translate('Name')}
        blurOnSubmit={true}
        // underlineColorAndroid={'transparent'}
        onChangeText={(name) => {
          if (this.isFolder()) {
            this.setState({ name })
            this.data.name = name;
          } else {
            this.setState({ fileName: name })
            this.data.fileName = name;
          }
        }}
        value={this.isFolder() ? this.state.name : this.state.fileName}
        autoCapitalize='none'
        editable={this.state.isEditMode}
        returnKeyType='next'
      />
    )
  }

  renderLanguageInput = () => {
    return (
      <TextInput
        ref="txtLanguage"
        style={[styles.input]}
        placeholderTextColor={StyleConfig.color_gray}
        placeholder={translate('Language')}
        blurOnSubmit={true}
        underlineColorAndroid={'transparent'}
        onChangeText={(language) => this.setState({ language })}
        value={this.state.language}
        autoCapitalize='none'
        editable={this.state.isEditMode}
        returnKeyType='next'
      />
    )
  }

  renderTagsInput = () => {
    return (
      <TextInput
        ref="txtTags"
        style={[styles.input]}
        placeholderTextColor={StyleConfig.color_gray}
        placeholder={translate('Tags')}
        blurOnSubmit={true}
        underlineColorAndroid={'transparent'}
        onChangeText={(tags) => {
          this.setState({ tags: tags.split(',') })
          this.data.tags = tags.split(',');
        }}
        value={this.state.tags && this.state.tags.join(',')}
        autoCapitalize='none'
        editable={this.state.isEditMode}
        returnKeyType='next'
      />
    )
  }

  renderRatingInput = () => {
    return (
      <TextInput
        ref="txtRating"
        style={[styles.input]}
        placeholderTextColor={StyleConfig.color_gray}
        placeholder={translate('Rating')}
        blurOnSubmit={true}
        underlineColorAndroid={'transparent'}
        onChangeText={(rating) => this.setState({ rating })}
        value={this.state.rating}
        autoCapitalize='none'
        editable={this.state.isEditMode}
        returnKeyType='next'
      />
    )
  }

  renderCommentInput = () => {
    return (
      <TextInput
        ref="txtComment"
        style={[styles.input]}
        placeholderTextColor={StyleConfig.color_gray}
        placeholder={translate('VersionComment')}
        blurOnSubmit={true}
        underlineColorAndroid={'transparent'}
        onChangeText={(comment) => {
          this.setState({ comment })
          this.data.comment = comment;
        }}
        value={this.state.comment}
        autoCapitalize='none'
        editable={this.state.isEditMode}
        returnKeyType='next'
      />
    )
  }

  renderDescriptionInput = () => {
    return (
      <TextInput
        ref="txtDescription"
        style={[styles.input]}
        placeholderTextColor={StyleConfig.color_gray}
        placeholder={translate('Description')}
        blurOnSubmit={true}
        underlineColorAndroid={'transparent'}
        onChangeText={(description) => {
          this.setState({ description })
          this.data.description = description;
        }}
        value={this.state.description}
        autoCapitalize='none'
        editable={this.state.isEditMode}
        returnKeyType='next'
      />
    )
  }

  renderGeneralSection() {
    return (
      <Section title='General'>
        <KeyValueRow title={translate('Name')}>
          {
            this.renderNameInput()
          }
        </KeyValueRow>
        <KeyValueRow title={translate('Creator')}>
          <TextInput
            ref="txtCreator"
            style={[styles.input]}
            placeholderTextColor={StyleConfig.color_gray}
            placeholder={translate('Creator')}
            blurOnSubmit={true}
            underlineColorAndroid={'transparent'}
            value={this.state.creator}
            autoCapitalize='none'
            editable={false}
            returnKeyType='next'
          />
        </KeyValueRow>
        <KeyValueRow title={translate('CreationDate')}>
          <TextInput
            ref="txtCreationDate"
            style={[styles.input]}
            placeholderTextColor={StyleConfig.color_gray}
            placeholder={translate('CreationDate')}
            blurOnSubmit={true}
            underlineColorAndroid={'transparent'}
            value={moment(this.state.creation, 'YYYY-MM-DD HH:mm:ss.sss ZZ').format('YYYY-MM-DD')}
            autoCapitalize='none'
            editable={false}
            returnKeyType='next'
          />
        </KeyValueRow>
        <KeyValueRow title={translate('Modifier')}>
          <TextInput
            ref="txtModifier"
            style={[styles.input]}
            placeholderTextColor={StyleConfig.color_gray}
            placeholder={translate('Modifier')}
            blurOnSubmit={true}
            underlineColorAndroid={'transparent'}
            value={this.state.creator}
            autoCapitalize='none'
            editable={false}
            returnKeyType='next'
          />
        </KeyValueRow>
        <KeyValueRow title={translate('ModificationDate')}>
          <TextInput
            ref="txtModificationDate"
            style={[styles.input]}
            placeholderTextColor={StyleConfig.color_gray}
            placeholder={translate('ModificationDate')}
            blurOnSubmit={true}
            underlineColorAndroid={'transparent'}
            value={moment(this.state.lastModified, 'YYYY-MM-DD HH:mm:ss.sss ZZ').format('YYYY-MM-DD HH:mm:ss')}
            autoCapitalize='none'
            editable={false}
            returnKeyType='next'
          />
        </KeyValueRow>
        {
          !this.isFolder() &&
          <KeyValueRow title={translate('Version')}>
            <TextInput
              ref="txtVersion"
              style={[styles.input]}
              placeholderTextColor={StyleConfig.color_gray}
              placeholder={translate('Version')}
              blurOnSubmit={true}
              underlineColorAndroid={'transparent'}
              value={this.state.version}
              autoCapitalize='none'
              editable={false}
              returnKeyType='next'
            />
          </KeyValueRow>
        }
      </Section>
    );
  }

  renderDetailsSection() {
    return (
      <Section title='Details'>
        <KeyValueRow title={translate('Tags')}>
          {
            this.renderTagsInput()
          }
        </KeyValueRow>
        {/*
        <KeyValueRow title={translate('Rating')}>
          {
            this.state.isEditMode ? this.renderRatingInput() :
              <Text style={styles.content}>
                {item.rating}
              </Text>
          }
        </KeyValueRow>
        <KeyValueRow title={translate('Language')}>
          {
            this.state.isEditMode ? this.renderLanguageInput() :
              <Text style={styles.content}>
                {item.language}
              </Text>
          }
        </KeyValueRow>*/}
        {
          !this.isFolder() &&
          <KeyValueRow title={translate('VersionComment')}>
            {
              this.renderCommentInput()
            }
          </KeyValueRow>
        }

        {
          this.isFolder() &&
          <KeyValueRow title={translate('Description')}>
            {
              this.renderDescriptionInput()
            }
          </KeyValueRow>
        }
      </Section>
    );
  }

  renderWorkflowSection() {
    let sectionTitle = 'Workflow';
    let workflowStatus = this.getWorkflowStatus();
    debugger;
    if (workflowStatus) {
      sectionTitle = 'Workflow Status: ' + workflowStatus;
    }

    return (

      <Section title={sectionTitle}>
        {
          !workflowStatus && <View style={[{ flex: 1 }, styles.row]}>
            <Button
              onPress={this.startWorkflow.bind(this)}
              title={translate("Submit")} />

            <Text style={{ fontSize: 14 }}>{this.state.workflowMessage}</Text>
          </View>
        }
        {
          workflowStatus && <View style={[{ flex: 1 }, styles.column]}>
            <View style={[{ flex: 1 }, styles.row]}>
              <Dot onPress={() => { }} backgroundColor='black' />
            </View>
            <View style={[{ flex: 1 }, styles.column]}>

            </View>
          </View>
        }
      </Section >
    );
  }

  startWorkflow() {
    const that = this;
    const { navigation, username, password } = this.props;
    const item = navigation.state.params.node;

    that.setState({ workflowStatus: 'Running' });

    let apiUrl = 'http://isd4u.com/dmsadmin/index.php';
    var options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    };


    fetch(apiUrl + '?user/loginSubmit&name=' + username + '&password=' + password + '&language=en&action=api', options)
      .then(response => response.json())
      .then(responseJson => {
        return responseJson.return;
      })
      .then(sid => {
        fetch(apiUrl + '?workflow/getworkflowlist&tenantid=1', options)
          .then(response => response.json())
          .then(appList => {
            return appList[0].id;
          })
          .then(appId => {
            fetch(apiUrl + '?workflow/startworkfolw&startuser=' + username + '&workflowid=' + appId + '&docid=' + item.id, options)
              .then(response => response.json())
              .then(responseJson => {
                that.setState({ workflowMessage: responseJson.code + ' - ' + responseJson.msg });
              })
          })
      })

  }

  getWorkflowStatus() {
    return this.state.workflowStatus;
  }
}

function select(store) {
  return {
    username: store[NAME].account.username,
    password: store[NAME].account.password,
  };
}

function dispatch(dispatch) {
  return {
    // 发送行为
    updateDocument: (username, password, document) => dispatch(actions.updateDocument(username, password, document)),
    updateFolder: (username, password, folder) => dispatch(actions.updateFolder(username, password, folder)),
  }
};

export default connect(select, dispatch)(DocumentDetails);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
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
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  column: {
    flexDirection: 'column',
    padding: 10,
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    flex: 1,
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
  input: {
    fontSize: StyleConfig.font_sm,
    padding: StyleConfig.space_0,
    height: 30,
    lineHeight: 26,
    color: StyleConfig.color_dark
  }
});
