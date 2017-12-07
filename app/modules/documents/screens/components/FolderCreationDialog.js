'use strict';

import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
} from 'react-native';
import Dialog from './Dialog';

export default class FolderCreationDialog extends Component {
    render() {
        return (
            <View>
                <Dialog
                    onCancel={this.props.onCancel}
                    onOK={this.props.onOK}
                    modalVisible={this.props.modalVisible}
                >
                    <View><Text style={{ fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginBottom: 20, }}>Folder Name:</Text></View>
                    <View><TextInput
                        ref="txtFolderName"
                        style={{ borderWidth: 1, height: 30, fontSize: 16, }}
                        placeholder={'Folder Name'}
                        blurOnSubmit={true}
                        underlineColorAndroid={'transparent'}
                        onChangeText={this.props.onChangeFolderName}
                        value={this.props.folderName}
                    /></View>
                </Dialog>
            </View>
        );
    }
}