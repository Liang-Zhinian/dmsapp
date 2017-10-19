/**
 * MIT License
 *
 * Copyright (c) 2017 johnwakley
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

// @flow

import React, { Component } from 'react'
import { View, FlatList, Text, ActivityIndicator, StyleSheet, Image, TouchableHighlight } from 'react-native'
// import SearchView from './SearchView'
// import Base64 from './common/Base64'
import DmsRestApi from './common/createNetworkEnvironment'
import { soap, soap_param } from './common/soap'

const FOLDER_ID = '4161538';

export default class DocumentsView extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerTitle: `${typeof navigation.state.params !== 'undefined' ? navigation.state.params.node.name : 'Documents'}`,
  });

  constructor(props) {
    super(props);
    this.state = {
      isFetching: true,
      error: false,
      errorInfo: "",
      dataArray: [],
      //node: { id: FOLDER_ID, name:'Documents' }
    }
  }


  //网络请求
  fetchData = () => {
    var _self = this;
    /*
        let xml = '';
        xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>";
        xml += "<soap:Envelope ";
        xml += "xmlns:xsi = \"http://www.w3.org/2001/XMLSchema-instance\" ";
        xml += "xmlns:xsd= \"http://www.w3.org/2001/XMLSchema\" ";
        xml += "xmlns:soap= \"http://schemas.xmlsoap.org/soap/envelope/\">";
        xml += "<soap:Body xmlns:m=\"http://ws.logicaldoc.com\" soap:encodingStyle=\"http://schemas.xmlsoap.org/soap/encoding/\">";
        xml += "<m:login>";
        xml += "<m:username>admin</m:username>";
        xml += "<m:password>admin</m:password>"
        xml += "</m:login>";
        xml += "</soap:Body>";
        xml += "</soap:Envelope>";
        soap.send('http://dms.isd4u.com:8080/services/Auth?wsdl', 'POST', xml, function (data) { console.log(data); });
    */

    var pl = new soap_param();
    pl.add("username", 'admin');
    pl.add("password", 'admin');
    soap.invoke('http://dms.isd4u.com:8080/services/Auth',
      "login",
      pl,
      true,
      (err, res) => {
        console.log(err);
        console.log(res);
      });

    // The screen's current route is passed in to `props.navigation.state`:
    const { params } = this.props.navigation.state;
    let folderId = FOLDER_ID;
    if (params && params.node) {
      folderId = params.node.id;
    }

    console.log(params);

    DmsRestApi.listChildren(folderId, function (err, data) {
      if (err) {

        _self.setState({
          //复制数据源
          dataArray: [],
          isFetching: false,
          error: true,
          errorInfo: err
        });
        return;
      }

      _self.setState({
        //复制数据源
        dataArray: data,
        isFetching: false,
        error: false
      });

    });
  }

  componentDidMount() {
    //请求数据
    this.fetchData();
  }

  //加载等待的view
  renderLoadingView() {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          animating={true}
          style={[styles.gray, { height: 80 }]}
          color='red'
          size="large"
        />
      </View>
    );
  }

  //加载失败view
  renderErrorView(error) {
    return (
      <View style={styles.container}>
        <Text>
          Fail: {error}
        </Text>
      </View>
    );
  }



  //返回itemView
  renderItem = ({ item }: { item: any }) => {

    var icon = require('./img/icons/opened-folder.png');

    switch (item.value.type) {
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'gif':
        icon = require('./img/icons/picture.png');
        break;

      default:
        break;
    }

    return (
      <TouchableHighlight
        onPress={() => this._onPressItem(item.value)}
        underlayColor='#dddddd'>
        <View>
          <View style={styles.rowContainer}>
            <Image style={styles.thumb} source={icon} ></Image>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.value.name || item.value.fileName}</Text>
              <Text style={styles.content}>{item.value.creation}</Text>
            </View>
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    );
  }

  _onPressItem = (folder: any) => {
    //console.log(folder);
    const { navigate } = this.props.navigation;
    navigate('Documents', { node: folder });
  }

  renderData() {
    return (
      <FlatList
        data={this.state.dataArray}
        renderItem={this.renderItem}
      />
    );
  }

  render() {
    //第一次加载等待的view
    if (this.state.isFetching && !this.state.error) {
      return this.renderLoadingView();
    } else if (this.state.error) {
      //请求失败view
      return this.renderErrorView(this.state.errorInfo);
    }
    //加载数据
    return this.renderData();
  }
} // end DocumentsView class


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  thumb: {
    width: 50,
    height: 50,
    marginRight: 10
  },
  // title: {
  //   fontSize: 15,
  //   color: 'blue',
  // },
  content: {
    fontSize: 12,
    color: 'black',
  },
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#48BBEC'
  },
  title: {
    fontSize: 15,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  },

});
