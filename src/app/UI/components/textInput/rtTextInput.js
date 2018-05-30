import React from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { RtComponent } from '../rtComponent';


export class RtTextInput extends RtComponent {

  constructor(props) {
    super(props);
    this.focusInput = this._focusInput.bind(this);
  }

  _focusInput() {
    this.refs.input.focus();
  }

  _displayLabel(label, labelStyle) {
    if (typeof label === 'string') {
      return (
        <Text style={labelStyle} onPress={this.focusInput}>{label}</Text>
      );
    } else {
      return React.cloneElement(label, {
        onPress: (e) => {
          this.refs.input.focus();
          label.props.onPress && label.props.onPress(e);
        },
        style: [labelStyle, label.props.style]
      });
    }
  }

  render() {
    let {
      style,
      label,
      labelStyle,
      inputStyle,
      ...inputProps
    } = this.props;

    labelStyle = [labelStyle];
    inputProps.style = [inputStyle];
    boxStyle.push(style);
    return (
      <TouchableOpacity activeOpacity={1} onPress={this.focusInput} style={boxStyle}>
        {label && this._displayLabel(label, labelStyle)}
        <TextInput underlineColorAndroid='transparent' ref={'input'} {...inputProps} />
      </TouchableOpacity>
    );
  }
}