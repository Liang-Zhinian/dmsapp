'use strict';

import React, { Component } from 'react';
import {
    Modal,
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
} from 'react-native';
import FadeInView from './fade_in_view';

class Dialog extends Component {

    renderCancelButton() {
        return (
            <TouchableOpacity style={[styles.button, { borderRightWidth: 1, }]} onPress={this.props.onCancel}>
                <Text style={styles.buttonText}>
                    Cancel
            </Text>
            </TouchableOpacity>
        )
    }

    renderOkButton() {
        return (
            <TouchableOpacity style={styles.button} onPress={this.props.onOK}>
                <Text style={styles.buttonText}>
                    OK
            </Text>
            </TouchableOpacity>
        )
    }

    render() {
        // return (
        //     <View>{this.props.children}</View>
        // )
        return (
            <FadeInView
                visible={this.props.modalVisible}
                backgroundColor={this.props.backgroundColor}
            >
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.props.modalVisible}
                    onRequestClose={this.props.onCancel}
                >
                    <View style={styles.modalContainer}>
                        <TouchableOpacity style={styles.container} onPress={this.props.onCancel}></TouchableOpacity>
                        <View style={[styles.content,]}>
                            <View style={{
                                flex: 1,
                                padding: 20,
                            }}>
                                {this.props.children}
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                borderTopWidth: 1,
                            }}>
                                {this.renderCancelButton()}
                                {this.renderOkButton()}
                            </View>
                        </View>
                        <TouchableOpacity style={styles.container} onPress={this.props.onCancel}></TouchableOpacity>
                        </View>
                </Modal>
            </FadeInView>
        );
    }
}

export default Dialog;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    modalContainer: {
        flex: 1,
        padding: 8,
        paddingBottom: 0,
        justifyContent: "flex-end"
    },
    content: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignContent: 'flex-end',
        alignItems: 'stretch',
        borderRadius: 10,
        backgroundColor: 'white',
        marginLeft: '10%',
        marginRight: '10%',
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
        borderColor: 'white',
        borderWidth: 1,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    }
});
