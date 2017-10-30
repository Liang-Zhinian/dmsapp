import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  WebView,
} from 'react-native';
import { connect } from 'react-redux'
import Pdf from 'react-native-pdf';
import { NAME } from '../constants'
import * as actions from '../actions'
import { StyleConfig, ComponentStyles, CommonStyles } from '../../../style'
import * as API from '../api/api'
import Base64 from '../lib/Base64'
import XMLParser from '../lib/XMLParser'


function toJson(xmlString) {
  var xmlParser = new XMLParser();
  var xmlDoc = xmlParser.parseFromString(xmlString);
  let json = xmlParser.toJson(xmlDoc);
  return json;
}

class DocumentsDetailsView extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: `${typeof navigation.state.params !== 'undefined' ? navigation.state.params.node.name || navigation.state.params.node.fileName : 'Documents'}`,
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
      content: ""
    }
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

  componentWillMount() {
    const { sid, username, password, navigation } = this.props;
    const item = navigation.state.params.node;
    API.getContentSOAP(sid, item.id)
      .then(([response, responseText]) => {
        console.log(responseText)
        const reponseJson = toJson(responseText);
        const content = reponseJson.Body.getContentResponse.return;
        switch (item.type) {
          case 'png':
          case 'jpg':
          case 'jpeg':
          case 'gif':
          case 'pdf':
            this.setState({
              content: `data:application/${item.type};base64,${content}`
            });
            break;

          case 'txt':
            this.setState({
              content: `${Base64.atob(content)}`
            });
            break;

          default:
            this.setState({
              content: `${Base64.atob(content)}`
            });
            break;
        }
        // if (item.type === 'png' || item.type === 'jpg' || item.type === 'jpeg' || item.type === 'gif') {
        //   this.setState({
        //     content: `data:application/${item.type};base64,${content}`
        //   });
        // }
        // else if (item.type === 'pdf') {
        //   this.setState({
        //     content: `data:application/${item.type};base64,${content}`
        //   });
        // }
        // else {
        //   this.setState({
        //     content: `${Base64.atob(content)}`
        //   });
        // }
      })
      .catch(error => {
        console.error(error)
      })
  }

  renderData() {
    const { username, password, navigation } = this.props;
    const item = navigation.state.params.node;
    switch (item.type) {
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'gif':
        return this.renderImage();
        break;
      case 'pdf':
        return this.renderPdf();
        break;

      case 'txt':
        return renderText(this.state.content);
        break;

      default:
        return renderText('Unsuprorted file.');
        break;
    }

    // if (item.type === 'png' || item.type === 'jpg' || item.type === 'jpeg' || item.type === 'gif') {
    //   return this.renderImage();
    // }
    // else if (item.type === 'txt') {
    //   return renderText(this.state.content);
    // }
    // else if (item.type === 'pdf') {
    //   return this.renderPdf();
    // }
    // else {
    //   return renderText('Unsuprorted file.');
    // }
  }

  renderText(content) {
    return (
      <Text>{content}</Text>
    );
  }

  renderImage() {
    return (
      <ScrollView
        contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
        minimumZoomScale={1.0}
        maximumZoomScale={2}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={true}
        centerContent={true}
        style={styles.scrollViewContainer}
      >
        <Image
          style={styles.image}
          resizeMode='contain'
          source={{ uri: this.state.content }}
        />
      </ScrollView>
    )
  }

  renderPdf() {
    return (
      <View style={styles.container}>
        <Pdf
          source={{ uri: this.state.content }}
          onLoadComplete={(pageCount) => {
            console.log(`total page count: ${pageCount}`);
          }}
          onPageChanged={(page, pageCount) => {
            console.log(`current page: ${page}`);
          }}
          onError={(error) => {
            console.log(error);
          }}
          style={styles.pdf} />
      </View>
    );
  }

  render() {
    // const { navigation } = this.props;
    // const item = navigation.state.params.node;
    // console.log(item)

    //第一次加载等待的view
    if (this.state.isFetching && !this.state.error && !this.state.content) {
      return this.renderLoadingView();
    } else if (this.state.error) {
      //请求失败view
      return this.renderErrorView(this.state.errorInfo);
    }

    //加载数据
    return this.renderData();
    // return (
    //   <View style={styles.container}>
    //     <Text style={styles.row}>
    //       Name: {item.name || item.fileName}
    //     </Text>
    //     <Text style={styles.row}>
    //       Creation: {item.creation}
    //     </Text>
    //   </View>
    // )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'row',
    justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#F5FCFF',
    // justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  scrollViewContainer: {
    flex: 1,
    backgroundColor: 'black',
    // justifyContent: 'center',
    // overflow: 'hidden', 
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Avenir',
    textAlign: 'center',
    fontSize: 16,
  },
  buttonContainer: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    paddingHorizontal: 30,
    paddingVertical: 30
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, .10)',
    borderColor: 'rgba(255, 255, 255, .75)',
    borderWidth: 2,
    borderRadius: 50,
    paddingHorizontal: 40,
    paddingVertical: 10,
  },
  image: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
  }
});

function select(store) {
  return {
    username: store[NAME].username,
    password: store[NAME].password,
    sid: store[NAME].sid,
    // navigation: store[NAME].nav,
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