'use strict'

import React, { Component } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    View
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Styles from '../styles';
const { CommonStyles, colors } = Styles;

export const HeaderButton = (props: Object): ReactElement => {
    const { disabled = false, visible = true, onPress = () => null } = props;

    let icon;
    if (props.icon) {
        icon = <MaterialIcons
            name={props.icon}
            size={28}
            style={styles.icon}
        />;
    }

    let text;
    let color = {};
    if (disabled) color.color = 'gray';
    if (props.text) {
        text = <Text style={[styles.text, color,]}>
            {props.text}
        </Text>;
    }

    return (
        <TouchableOpacity
            style={[styles.button, {
                display: visible ? 'flex' : 'none',
            }]}
            //accessibilityLabel={text || icon || ''}
            onPress={onPress}
            {...props}
        >
            {icon}
            {text}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        marginRight: 14,
        justifyContent: 'center',
    },
    icon: {
        color: colors.textOnPrimary,
    },
    text: {
        color: colors.textOnPrimary,
        fontSize: 20,
    },
});