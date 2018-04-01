import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';
const { connect } = require('react-redux');
import PropTypes from 'prop-types';
import DoveButton from './DoveButton';

class AuthButton extends Component {
  static propTypes = {
      style: PropTypes.any,
      source: PropTypes.string, // For Analytics
      dispatch: (action: PropTypes.any) => Promise,
      onLoggedIn: PropTypes.func
  };

  static stateTypes = {
      isLoading: PropTypes.bool,
  };

  static defaultProps = { _isMounted: PropTypes.bool };

  componentDidMount() {
      this._isMounted = true;
  }

  componentWillUnmount() {
      this._isMounted = false;
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    }
  }
  render() {
    if (this.state.isLoading) {
      return (
        <DoveButton
          style={[styles.button, this.props.style]}
          caption="Please wait..."
          onPress={() => { }}
        />
      );
    }

    return (
      <DoveButton
        style={[styles.button, this.props.style]}
        caption="Log in"
        onPress={() => this.logIn()}
      />
    );
  }


  async logIn() {
    const { dispatch, onLoggedIn } = this.props;

    this.setState({ isLoading: true });
    try {
      await Promise.race([
        // dispatch(logInWithFacebook(this.props.source)),
        timeout(15000),
      ]);
    } catch (e) {
      const message = e.message || e;
      if (message !== 'Timed out' && message !== 'Canceled by user') {
        alert(message);
        console.warn(e);
      }
      return;
    } finally {
      this._isMounted && this.setState({ isLoading: false });
    }

    onLoggedIn && onLoggedIn();
  }
}

async function timeout(ms: number): Promise {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('Timed out')), ms);
  });
}

var styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    width: 270,
  },
});

export default connect()(AuthButton);