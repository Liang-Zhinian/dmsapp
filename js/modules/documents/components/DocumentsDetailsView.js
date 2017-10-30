import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux'
import { NAME } from '../constants'
import * as actions from '../actions'
import { StyleConfig, ComponentStyles, CommonStyles } from '../../../style'
import * as API from '../api/api'
import Base64 from '../lib/Base64'

class DocumentsDetailsView extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: `${typeof navigation.state.params !== 'undefined' ? navigation.state.params.node.name || navigation.state.params.node.fileName : 'Documents'}`,
    // headerRight: (
    //   <Button title={isInfo ? 'Done' : `${user}'s info`}
    //   onPress={() => setParams({ mode: isInfo ? 'none' : 'info'})} />
    // ),
  });

  render() {
    const { navigation } = this.props;
    const item = navigation.state.params.node;
    // console.log(item)

    //第一次加载等待的view
    // if (this.state.isFetching && !this.state.error) {
    //   return this.renderLoadingView();
    // } else if (this.state.error) {
    //   //请求失败view
    //   return this.renderErrorView(this.state.errorInfo);
    // }

    //加载数据
    // return this.renderData();
    return (
      <View style={styles.container}>
        <Text style={styles.row}>
          Name: {item.name || item.fileName}
        </Text>
        <Text style={styles.row}>
          Creation: {item.creation}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: null,
    height: null,
    backgroundColor: '#F5FCFF',
  },
  row: {
    fontSize: 20,
    textAlign: 'left',
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    width: null,
    height: null,
  },
});

function select(store) {
  return {
    username: store[NAME].username,
    password: store[NAME].password,
  };
}

function dispatch(dispatch) {
  return {
    // 发送行为
    getContent: (username, password, docId) => dispatch(actions.getContent(username, password, docId)),
    // valid: (sid) => dispatch(actions.valid(sid)),
  }
};

export default connect(select, dispatch)(DocumentsDetailsView);