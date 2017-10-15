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
import { View, FlatList, Text, ActivityIndicator, StyleSheet } from 'react-native'
import SearchView from './SearchView'
import Base64 from './common/Base64'

const FOLDER_ID = '4161538';
const REQUEST_URL_FOLDER_LIST_CHILDREN = 'http://dms.isd4u.com:8080/services/rest/folder/listChildren?folderId=' + FOLDER_ID;
const REQUEST_URL_DOCUMENT_LIST = 'http://dms.isd4u.com:8080/services/rest/document/list?folderId=' + FOLDER_ID;
const AUTHORIZATION = 'Basic '+Base64.btoa('admin:admin');

export default class AccountDetailView extends Component {
  static navigationOptions = {
    headerTitle: 'Documents'
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      //网络请求状态
      error: false,
      errorInfo: "",
      dataArray: [],
    }
  }


  //网络请求
  fetchData() {
    var i = 0;
    //这个是js的访问网络的方法
    fetch(REQUEST_URL_FOLDER_LIST_CHILDREN, {

      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': AUTHORIZATION,
      }
    })
      .then((response) => response.json())
      .then((responseData) => {
        let data = responseData;
        let dataBlob = [];
        //let i = 0;
        data.map(function (item) {
          dataBlob.push({
            key: i,
            value: item //{id:item.id, name:item.name, type:item.type, description:item.description},
          })
          i++;
        });
        this.setState({
          //复制数据源
          dataArray: dataBlob,
          isLoading: false,
        });
        data = null;
        dataBlob = null;
      })
      .catch((error) => {
        this.setState({
          error: true,
          errorInfo: error
        })
      })
      .done();

      fetch(REQUEST_URL_DOCUMENT_LIST, {
        
              method: 'GET',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': AUTHORIZATION,
              }
            })
              .then((response) => response.json())
              .then((responseData) => {
                let data = responseData;
                let dataBlob = [];
                //let i = 0;
                data.map(function (item) {
                  dataBlob.push({
                    key: i,
                    value: item //{id:item.id, name:item.name, type:item.type, description:item.description},
                  })
                  i++;
                });
                this.setState({
                  //复制数据源
                  dataArray: this.state.dataArray.concat(dataBlob),
                  isLoading: false,
                });
                data = null;
                dataBlob = null;
              })
              .catch((error) => {
                this.setState({
                  error: true,
                  errorInfo: error
                })
              })
              .done();
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
  renderItemView({ item }) {
    return (
      <View>
        <Text style={styles.title}>id: {item.value.id} - name: {item.value.name || item.value.fileName} ({item.value.type})</Text>
        <Text style={styles.content}>description: {item.value.description}</Text>
      </View>
    );
  }

  renderData() {
    return (
      // <ScrollView >
      //   <Text >
      //     Data:
      //             </Text>
      //   <AnimatedFlatList
      //     data={this.state.dataArray}
      //     renderItem={this.renderItemView}
      //   />
      // </ScrollView>
      <FlatList
        data={this.state.dataArray}
        renderItem={this.renderItemView}
      />
    );
  }

  render() {
    // const query = 'stars:>=1 fork:true&sort=stars&order=desc'

    // return <SearchView navigation={this.props.navigation} searchQuery={query} />

    //第一次加载等待的view
    if (this.state.isLoading && !this.state.error) {
      return this.renderLoadingView();
    } else if (this.state.error) {
      //请求失败view
      return this.renderErrorView(this.state.errorInfo);
    }
    //加载数据
    return this.renderData();

    // return (
    //   <FlatList
    //     data={[{ key: 'a' }, { key: 'b' }]}
    //     renderItem={({ item }) => <Text>{item.key}</Text>}
    //   />
    // )
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
  title: {
    fontSize: 15,
    color: 'blue',
  },
  content: {
    fontSize: 15,
    color: 'black',
  }

});
