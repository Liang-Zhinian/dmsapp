import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    Text,
    TextInput,
    View,
    Button,
    AsyncStorage,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import Toast from '../components/ToastModule';
import TextBox from '../components/TextBox';
import CommonStyles from '../styles/CommonStyles';
import ComponentStyles from '../styles/ComponentStyles';
import StyleConfig from '../styles/StyleConfig';
// import AuthButton from '../components/AuthButton';
import DoveButton from '../components/DoveButton';

class LoginScreen extends Component {
    static defaultProps = { _isMounted: PropTypes.boolean };

    static navigationOptions = {
        headerLeft: null
    };

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isLoading: false,
        };
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;

    }

    componentWillMount() {
        // const {username, password} = this.props;
        // this.setState({username, password});
    }

    render() {
        return (
            <ScrollView
                contentContainerStyle={{
                    justifyContent: 'center',
                }}
                style={styles.container}
                keyboardShouldPersistTaps={'always'}
            >
                <View style={{
                    flexDirection: 'row', height: 50, marginTop: 1,
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                }}>
                    <Text
                        style={{ fontSize: 27 }}>
                        Login
                    </Text>
                </View>
                <View style={{ marginTop: 10 }}>
                    <TextBox
                        placeholder={'User name'}
                        onChangeText={(username) => this.setState({ username })}
                        returnKeyType='next'
                        autoCapitalize='none'
                        value={this.state.username}
                    />
                    <View style={{ margin: 7 }} />
                    <TextBox
                        placeholder={'Password'}
                        onChangeText={(password) => this.setState({ password })}
                        secureTextEntry={true}
                        value={this.state.password}
                    />
                </View>
                <View style={{ margin: 7 }} />
                {this.state.isLoading ?
                    <DoveButton
                        style={[styles.button, this.props.style]}
                        caption="Please wait..."
                        onPress={() => { }}
                    />
                    : <DoveButton
                        caption="Sign in!"
                        onPress={this._signInAsync}
                    />}
            </ScrollView>
        )
    }

    _signInAsync = async () => {
        const { dispatch, login } = this.props;

        this.setState({ isLoading: true });
        try {
            await Promise.race([
                login(this.state.username, this.state.password),
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
    };
}

async function timeout(ms: number): Promise {
    return new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error('Timed out')), ms);
    });
}

function select(store) {
    return {
        // username: store.auth.user.username,
        // password: store.auth.user.password,
        // sid: store[NAME].account.token.sid,
    };
}

function dispatch(dispatch) {
    return {
        login: (username, password) => dispatch(login(username, password)),
    }
};

export default connect(select, dispatch)(LoginScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'gray',
        padding: 30,
    }
});