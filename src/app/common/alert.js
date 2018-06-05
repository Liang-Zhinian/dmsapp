
import React, { Component } from 'react';
import {
    Alert,
} from 'react-native';

import { translate } from '../i18n/i18n';

export function confirm(title, msg, onOk: () => null, onCancel: () => null) {
    Alert.alert(title, msg, [
        {
            text: translate('OK'),
            onPress: () => {
                console.log('OK Pressed');
                onOk && onOk();
            }
        }, {
            text: translate('Cancel'),
            onPress: () => {
                console.log('Cancel Pressed')
                onCancel && onCancel();
            }
        },
    ], { cancelable: true });
}