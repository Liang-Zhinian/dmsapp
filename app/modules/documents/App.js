import React from 'react'
import { Platform, StatusBar, View } from 'react-native'
import { Provider, connect } from 'react-redux';

// Really annoying warning, expect it'll go away with v19 or so
console.ignoredYellowBox = ['Warning: checkPropTypes'];

// import { NAME } from './constants'
import MainNav from './navigation';
import configureStore from './configureStore';
import Explorer from './screens/Explorer';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      isLoading: true,
      store: configureStore(() => this.setState({ isLoading: false })),
    };
  }

  render() {
    if (this.state.isLoading) {
      return null;
    }


    return (
      <Provider store={this.state.store}>
        <View style={{ flex: 1 }}>
          {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
          {Platform.OS === 'android' && <View style={{ backgroundColor: 'rgba(0,0,0,0.2)' }} />}
          <MainNav navigation={this.props.navigation} />
        </View>
      </Provider>
    )
  }
}
// App.router = MainNav.router;
export default App;


