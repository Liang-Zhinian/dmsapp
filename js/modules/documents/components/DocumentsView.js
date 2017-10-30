
import React, { Component } from 'react'
import { View, FlatList, Text, ActivityIndicator, StyleSheet, Image, TouchableHighlight, Alert, Button } from 'react-native'
import { connect } from 'react-redux'
import * as API from '../api/api'
import SearchCellView from './SearchCellView'
import * as actions from '../actions'
import XMLParser from '../lib/XMLParser'
import { NAME } from '../constants'

class App extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerTitle: `${typeof navigation.state.params !== 'undefined' ? navigation.state.params.node.name : 'Documents'}`,
    // headerRight: (
    //   <Button title={isInfo ? 'Done' : `${user}'s info`}
    //   onPress={() => setParams({ mode: isInfo ? 'none' : 'info'})} />
    // ),
  });

  constructor(props) {
    super(props);
    this.state = {
      isFetching: true,
      error: false,
      errorInfo: "",
      dataArray: [],
      user: { username: '', password: '' }
    }
    const { username, password, isLoggedIn, sid, renew, valid, login } = this.props;
    console.log(`constructor => isLoggedIn: ${isLoggedIn}`)
    // if (!isLoggedIn) {
    console.log(`constructor => renewing sid...`)
    if (!sid) {
      login(username, password);
    }
    valid(sid);
    // renew(sid);
    // }
  }

  getRootFolder = (sid: string, cb: (value: int) => void) => {
    var _self = this;
    API.getRootFolder(sid, (err, res) => {
      if (err) {
        console.log(err);
        _self.setState({
          //复制数据源
          dataArray: [],
          isFetching: false,
          error: true,
          errorInfo: err.message,
          valid: false,
        });
        return;
      }
      let folderId = res.Body.getRootFolderResponse.folder.id;
      console.log(res.Body.getRootFolderResponse.folder.id);
      cb(folderId);
    });
  }

  listChildren = async (folderId: int) => {
    var _self = this;
    const { username, password, isLoggedIn, sid, renew } = this.props;

    let dataArray = [];
    let folders = await API.listChildrenFolders(username, password, folderId)
      .then(([response, responseJson]) => {
        return responseJson
      })
    let documents = await API.listChildrenDocuments(username, password, folderId)
      .then(([response, responseJson]) => {
        return responseJson
      })
    dataArray = [...folders, ...documents]
    _self.setState({
      //复制数据源
      dataArray: dataArray,
      isFetching: false,
      error: false
    });

  }


  //网络请求
  fetchData = () => {
    var _that = this;

    // _self.loginRequest((sid) => {
    let { username, password, sid, isLoggedIn, login, renew } = _that.props;
    // if (!sid || !isLoggedIn) {
    //   _that.setState({
    //     //复制数据源
    //     dataArray: [],
    //     isFetching: false,
    //     error: true,
    //     errorInfo: 'Please login first'
    //   });
    //   return;
    // }

    console.log('fetching data...')

    if (_that.props.navigation.state) {
      const { params } = _that.props.navigation.state;
      if (params && params.node && params.node.id) {
        _that.listChildren(params.node.id)
        return
      }
    }

    // let valid = await API.valid(sid)
    //   .then(([response, responseText]) => {
    //     let json = toJson(responseText);
    //     return json.Body.validResponse.return === 'true';
    //   })
    //   .catch((error) => {
    //     _that.setState({
    //       //复制数据源
    //       dataArray: [],
    //       isFetching: false,
    //       error: true,
    //       errorInfo: error.message
    //     });
    //     return false;
    //   });

    // if (!valid) {
    //   login(username, password);
    // }

    API.getRootFolder(sid)
      .then(([response, responseText]) => {
        var xmlParser = new XMLParser();
        var xml = xmlParser.parseFromString(responseText);
        var json = xmlParser.toJson(xml);
        if (json.Body.Fault) {
          _that.setState({
            //复制数据源
            dataArray: [],
            isFetching: false,
            error: true,
            errorInfo: json.Body.Fault.faultstring
          });
          renew(sid);
          return;
        }
        else {
          console.log(json)
          let folderId = json.Body.getRootFolderResponse.folder.id
          _that.listChildren(folderId)
        }
      })
      .catch((error) => {
        console.error(error);
      });
    // _that.getRootFolder(sid).then( (fid) => {

    //   const { params } = _that.props.navigation.state;
    //   if (params && params.node) {
    //     fid = params.node.id;
    //   }

    //   _that.listChildren(fid);
    // })
    // });

  }

  componentWillMount() {

    const { username, password, isLoggedIn, sid, renew, valid } = this.props;
    console.log(`componentWillMount => isLoggedIn: ${isLoggedIn}`)
    console.log(`componentWillMount => validating sid...`)
    // valid(sid)
    // if (isLoggedIn)
    // this.fetchData();
  }

  componentDidMount() {
    const { username, password, isLoggedIn, sid, renew, valid } = this.props;
    console.log(`componentDidMount => isLoggedIn: ${isLoggedIn}`)
    // if (!isLoggedIn) {

    // }
    this.fetchData();
  }

  // Start changing images with timer on first initial load
  componentWillReceiveProps(nextProps) {
    const { username, password, isLoggedIn, sid, renew, login } = nextProps;
    console.log(`componentWillReceiveProps => isLoggedIn: ${isLoggedIn}`)
    if (!isLoggedIn)
      login(username, password);
    // this.setState({ valid: isLoggedIn });
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   const { username, password, isLoggedIn, sid, renew } = nextProps;
  //   return this.props.isLoggedIn !== isLoggedIn;
  // }

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

    // var icon = require('../../../images/icons/opened-folder.png');

    // switch (item.type) {
    //   case 'png':
    //   case 'jpg':
    //   case 'jpeg':
    //   case 'gif':
    //     icon = require('../../../images/icons/picture.png');
    //     break;

    //   default:
    //     break;
    // }

    return (
      <SearchCellView
        onPress={() => this._onPressItem(item)}
        onPressInfo={() => this._onPressItemInfo(item)}
        type={item.type}
        title={item.name || item.fileName}
        description={item.creation}
      />
    );
  }

  _onPressItem = (item: any) => {
    //console.log(folder);
    const { navigate } = this.props.navigation;
    if (item.type === 0 || item.type === 1) {
      navigate('Documents', { node: item });
    } else {
      navigate('DocumentsPreview', { node: item });
    }
  }

  _onPressItemInfo = (item: any) => {
    //console.log(folder);
    const { navigate } = this.props.navigation;
    navigate('DocumentsDetails', { node: item });
  }

  renderData() {
    return (
      <FlatList
        data={this.state.dataArray}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => index}
      />
    );
  }

  render() {
    //第一次加载等待的view
    const { username, password, isLoggedIn, sid, renew, } = this.props;
    console.log(`render => isLoggedIn: ${isLoggedIn}`)
    if (this.state.isFetching && !this.state.error || !isLoggedIn) {
      return this.renderLoadingView();
    } else if (this.state.error) {
      //请求失败view
      return this.renderErrorView(this.state.errorInfo);
    }
    //加载数据
    return this.renderData();

    // return <View />
  }
} // end DocumentsView class


function select(store) {
  return {
    username: store[NAME].username,
    password: store[NAME].password,
    sid: store[NAME].sid,
    isLoggedIn: store[NAME].isLoggedIn,
    // navigation: store[NAME].nav
  };
}

function dispatch(dispatch) {
  return {
    // 发送行为
    renew: (sid) => dispatch(actions.renew(sid)),
    valid: (sid) => dispatch(actions.valid(sid)),
    login: (username, password) => dispatch(actions.login(username, password)),
  }
};

export default connect(select, dispatch)(App);



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
