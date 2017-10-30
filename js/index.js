import React from 'react'
import {
  StatusBar,
  Platform,
  View,
  Text
} from 'react-native'
import { Provider } from 'react-redux'

import App from './App'
import configureStore from './configureStore'
import colors from './common/colors'

// const store = configureStore()

// export default () => {
//   return (
//     <Provider store={store}>
//       <App />
//     </Provider>
//   )
// }


export default class Root extends React.Component {

  constructor() {
    super();
    this.state = {
      isLoading: true,
      store: configureStore(() => this.setState({isLoading: false})),
    };
  }
  render() {
    if (this.state.isLoading) {
      return null;
    }
    return (
      <Provider store={this.state.store}>
        <App />
      </Provider>
    );
  }
}

