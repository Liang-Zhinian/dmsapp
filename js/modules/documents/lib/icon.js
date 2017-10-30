import React, { Component } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { StyleConfig, ComponentStyles, CommonStyles } from '../../../style';

function _getIcon(name) {
    return <FontAwesome
        name={name}
        size={36}
        color={StyleConfig.color_gray}
        style={[CommonStyles.m_b_2, CommonStyles.m_r_2, CommonStyles.background_transparent]} />;
}

export default (type) => {
    let icon = _getIcon('file');
    switch (type) {
        case 0:
        case 1:
            icon = _getIcon('folder');
            break;

        case 'pdf':
            icon = _getIcon('file-pdf-o');
            break;

        case 'png':
        case 'jpg':
        case 'jpeg':
        case 'gif':
            icon = _getIcon('file-image-o');
            break;

        case 'txt':
            icon = _getIcon('file-text-o');
            break;

        case 'mp3':
            icon = _getIcon('file-audio-o');
            break;

        case 'mp4':
        case 'avi':
        case 'wmv':
            icon = _getIcon('file-video-o');
            break;

        case 'doc':
        case 'docx':
            icon = _getIcon('file-word-o');
            break;

        case 'ppt':
        case 'pptx':
            icon = _getIcon('file-powerpoint-o');
            break;

        case 'xls':
        case 'xlsx':
            icon = _getIcon('file-excel-o');
            break;

        case 'zip':
        case 'rar':
        case '7zip':
            icon = _getIcon('file-zip-o');
            break;

        default:
            break;

    }
    return icon;
}