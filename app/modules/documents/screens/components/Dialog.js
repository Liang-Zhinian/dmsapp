'use strict';

import React, { Component } from 'react';
import {
    Modal,
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    KeyboardAvoidingView,
    Dimensions,
} from 'react-native';
import FadeInView from './fade_in_view';

const { width, height } = Dimensions.get('window');

class Dialog extends Component {

    renderCancelButton() {
        return (
            <TouchableOpacity
                style={[styles.button, {
                    borderRightWidth: 1,
                    borderRightColor: 'grey',
                    borderBottomLeftRadius: 10,
                }]}
                onPress={this.props.onCancel}>
                <Text style={styles.buttonText}>
                    Cancel
                </Text>
            </TouchableOpacity>
        )
    }

    renderOkButton() {
        return (
            <TouchableOpacity
                style={[styles.button, {
                    borderBottomRightRadius: 10
                }]}
                onPress={this.props.onOK}>
                <Text style={styles.buttonText}>
                    OK
                </Text>
            </TouchableOpacity>
        )
    }

    render() {
<<<<<<< HEAD
        const contentHeight = this.props.height || height * 0.5;
=======
>>>>>>> 155aa520f5d00ec3ea1fe266d2ba3b7b384e74b1
        return (
            // <FadeInView
            //     visible={this.props.modalVisible}
            //     backgroundColor={this.props.backgroundColor}
            // >
            <Modal
                animationType={"slide"}
                transparent={true}
                visible={this.props.modalVisible}
                onRequestClose={this.props.onCancel}
            >
                {/*<View
                    style={[styles.container, {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }]}>*/}

                <KeyboardAvoidingView
                    keyboardVerticalOffset={-50}
                    behavior='padding'
                    style={[styles.container, {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }]}
                >
<<<<<<< HEAD
                    <View style={[styles.innerContainer, { height: contentHeight }]}>
                        <View style={{
                            flex: 1,
                            paddingTop: 10,
                            paddingLeft: 10,
                            paddingRight: 10,
                            flexDirection: 'column',
                        }}>
                            {this.props.children}
                        </View>
                        <View style={{
                            // flex: 1,
                            flexDirection: 'row',
                            borderTopWidth: 1,
                            borderTopColor: 'grey',
                            // paddingBottom: 10,
                        }}>
                            {this.renderCancelButton()}
                            {this.renderOkButton()}
                        </View>
                    </View>
                </KeyboardAvoidingView>
                {/*</View>*/}
            </Modal >

            //</FadeInView>
=======
                    <KeyboardAvoidingView 
                    keyboardVerticalOffset={-50}
                    behavior='position' 
                    style={styles.modalContainer}>
                        <TouchableOpacity style={styles.container} onPress={this.props.onCancel}></TouchableOpacity>
                        <View style={[styles.content,]}>
                            <View style={{
                                flex: 4,
                                padding: 20,
                                flexDirection: 'column',
                            }}>
                                {this.props.children}
                            </View>
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                borderTopWidth: 1,
                                borderTopColor: 'grey',
                                // paddingBottom: 10,
                            }}>
                                {this.renderCancelButton()}
                                {this.renderOkButton()}
                            </View>
                        </View>
                        <TouchableOpacity style={styles.container} onPress={this.props.onCancel}></TouchableOpacity>
                    </KeyboardAvoidingView>
                </Modal>
            </FadeInView>
>>>>>>> 155aa520f5d00ec3ea1fe266d2ba3b7b384e74b1
        );
    }
}

export default Dialog;

const styles = StyleSheet.create({
    container: {
        flex: 1,
<<<<<<< HEAD
        justifyContent: 'center',
        // padding: 20,
    },
    innerContainer: {
        // flex: 1,
        // flexDirection: 'column',
=======
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
        flex: 1,
        flexDirection: 'column',
>>>>>>> 155aa520f5d00ec3ea1fe266d2ba3b7b384e74b1
        borderRadius: 10,
        backgroundColor: 'white',
        marginLeft: '5%',
        marginRight: '5%',
<<<<<<< HEAD
        // width: width * 0.8,
        // height: height * 0.4,
=======
        width: width * 0.8,
>>>>>>> 155aa520f5d00ec3ea1fe266d2ba3b7b384e74b1
    },
    buttonText: {
        color: '#0069d5',
        alignSelf: 'center',
        fontSize: 18
    },
    button: {
        flex: 1,
        height: 36,
        backgroundColor: 'white',
<<<<<<< HEAD
=======
        // borderColor: 'white',
        // borderWidth: 1,
        // marginBottom: 10,
        // padding: 10,
        // alignSelf: 'stretch',
>>>>>>> 155aa520f5d00ec3ea1fe266d2ba3b7b384e74b1
        justifyContent: 'center',
        alignSelf: 'center'
    }
});
