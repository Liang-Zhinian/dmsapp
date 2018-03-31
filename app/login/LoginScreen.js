import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    View,
    Button,
    AsyncStorage,
} from 'react-native';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
// import { NAME } from '../constants';
import Toast from '../components/ToastModule';


const AsyncStorageKey = "AS_";

class LoginScreen extends Component {
    static navigationOptions = {
        headerLeft: null
    };

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }

    componentWillMount() {
        const { username, password, sid } = this.props;
        // if (username && password && sid)
        //     this.props.navigation.navigate('Main');
    }

    componentDidMount() {
        const { username, password, sid } = this.props;
        // if (username && password)
        //     this.setState({ username, password })
        
        // Toast.show('Hello, Toast', Toast.SHORT);
    }

    render() {
        return (
            <ScrollView style={{ padding: 20 }}>
                <Text
                    style={{ fontSize: 27 }}>
                    Login
                </Text>
                <TextInput placeholder='Username'
                    onChangeText={(username) => this.setState({ username })}
                    returnKeyType='next' />
                <TextInput placeholder='Password'
                    onChangeText={(password) => this.setState({ password })}
                    secureTextEntry={true} />
                <View style={{ margin: 7 }} />
                <Button
                    onPress={this._signInAsync}
                    title="Sign in!"
                />
            </ScrollView>
        )
    }

    submit() {
        const { login, navigation } = this.props;
        // login(this.state.username, this.state.password);
        navigation.dispatch({ type: 'Login' });
        // navigation.navigate('Main');
    }

    _signInAsync = async () => {
        const { login, navigation } = this.props;

        await login(this.state.username, this.state.password);
    };
}



function select(store) {
    return {
        // username: store[NAME].account.username,
        // password: store[NAME].account.password,
        // sid: store[NAME].account.token.sid,
    };
}

function dispatch(dispatch) {
    return {
        // 发送行为
        login: (username, password) => dispatch(login(username, password)),
    }
};

export default connect(select, dispatch)(LoginScreen);