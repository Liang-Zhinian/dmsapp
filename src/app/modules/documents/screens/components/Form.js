import React, { Component } from 'react';
import {
    ScrollView,
    StyleSheet,
    KeyboardAvoidingView
} from 'react-native';

import { RtAvoidKeyboard } from '../../../../UI';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class Form extends Component {

    constructor(props) {
        super(props);
    }


    render() {

        return (
            <KeyboardAwareScrollView>
                {this.props.children}
            </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // flexDirection: 'column',
        backgroundColor: '#F5FCFF',
    },
});
