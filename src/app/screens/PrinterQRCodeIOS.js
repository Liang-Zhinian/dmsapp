
//@flow

import React, { Component } from 'react';
import {
    NativeModules,
    Platform,
    View,
    ScrollView,
    Text,
    TextInput,
    StyleSheet,
    Alert,
    ActivityIndicator,
    ProgressViewIOS,
    TouchableOpacity,
    Button,
    SegmentedControlIOS,
    Dimensions
} from 'react-native';
import RNFS from 'react-native-fs';

import RNPrinting from '../components/RNPrinting';
import { translate } from '../i18n/i18n';
import QRCodeView from './QRCodeView';

var RNPrint = RNPrinting;

const { height, width } = Dimensions.get('window');

export default class PrinterQRCodeIOS extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;

        let headerTitle = translate('PrinterQRCodeGeneration');
        let headerLeft = (
            <View style={[
                CommonStyles.flexRow,
            ]}>
                <TouchableOpacity
                    style={{ marginLeft: 5, justifyContent: 'center' }}
                    accessibilityLabel='cancel'
                    onPress={() => { navigation.goBack(null) }}
                >
                    <Text style={{ color: '#ffffff', fontSize: 20 }}>{translate('Cancel')}</Text>
                </TouchableOpacity>
            </View>
        );

        return { headerTitle, headerLeft };
    };

    constructor(props) {
        super(props);
        this.state = {
            selectedPrinter: null,
        };
    }

    renderSpacer() {
        return (
            <View style={styles.spacer}></View>
        )
    }

    componentDidMount() {
        const that = this;
    }

    render() {

        return (
            <ScrollView style={{
                flex: 1,
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
            }}>

                <View style={[styles.section]}>
                    <View style={[{ flex: 1 }, styles.row]}>
                        <Text style={[styles.title]}>{translate('Printer')}</Text>
                        <Button onPress={this.selectPrinter} title={this.state.selectedPrinter ? this.state.selectedPrinter.name : translate('SelectPrinter')} />
                    </View>
                </View>
                <View style={[{ flex: 1 }, styles.section]}>

                    <View style={[{ flex: 1 }, styles.row, {
                        justifyContent: 'center',
                        alignItems: 'center',
                    }]}>
                        {
                            this.state.selectedPrinter ?
                            <QRCodeView 
                            text={this.state.selectedPrinter.url}
                            size={width-20}
                             />
                             :
                             <View style={{width:width-20, height: width-20}}></View>
                        }
                    </View>
                </View>
            </ScrollView>
        );
    }

    // @NOTE iOS Only
    selectPrinter = async () => {
        const selectedPrinter = await RNPrint.selectPrinter()
        this.setState({ selectedPrinter })
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    section: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 20,
        marginRight: 0,
        marginBottom: 20,
        marginLeft: 0,
        borderTopWidth: 1,
        borderTopColor: 'gray',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    row: {
        flexDirection: 'row',
        padding: 10,
        // marginRight: 10,
        // marginLeft: 10,
        backgroundColor: '#ffffff',
        // borderBottomWidth: 1,
        // borderBottomColor: 'gray',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        marginRight: 10,
        fontWeight: 'bold',
        width: 50,
        // backgroundColor: 'gray'
    },
    spacer: {
        height: 1,
        backgroundColor: 'gray',
        marginLeft: 10,
        marginRight: 10,
    },
    progressView: {
        flex: 1,
        marginLeft: 30,
        marginRight: 30,
        height: 10,
    },
});