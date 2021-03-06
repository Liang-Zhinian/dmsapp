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
    TouchableHighlight,
    Button,
    SegmentedControlIOS,
    Dimensions
} from 'react-native';
import RNFS from 'react-native-fs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// import RNPrint from 'react-native-print';

import RNPrinting from './RNPrinting';
import QrCodeScannerScreen from '../screens/QRCodeScanner';
import FileViewerIOS from "./RNQuickLook";
import { convert } from '../modules/documents/api/converter';
import {translate} from '../i18n/i18n';
import Styles from '../styles'

const CommonStyles = Styles.CommonStyles;
const StyleConfig = Styles.StyleConfig;

var RNPrint = RNPrinting;

const { height, width } = Dimensions.get('window');

class PrintInteractionScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;

        let headerTitle = translate('PrinterOptions');
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
            requestingQR: false,
            printerUrl: null,
            copies: 1,
        };
    }

    renderSpacer() {
        return (
            <View style={styles.spacer}></View>
        )
    }

    componentDidMount() {
        const that = this;
        const { file } = that.props.navigation.state.params;
        if (!file) return null;
    }

    render() {

        const { file } = this.props.navigation.state.params;

        if (!this.state.requestingQR)
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
                            {/*<Button onPress={this.scanQRCode} title={translate('Scan')} />
                            <Button onPress={this.selectPrinterWithUrl} title='Select Printer With Url' />*/}
                            <TouchableHighlight
                            onPress={this.scanQRCode}
                            style={[{
                                // width: 50,
                                // height: 50,
                            },
                            CommonStyles.flexItemsMiddle,
                            CommonStyles.flexItemsCenter,
                            ]}
                            underlayColor={StyleConfig.touchable_press_color}>
                            <View style={[
                                CommonStyles.flexColumn,
                                CommonStyles.flexItemsMiddle,
                                CommonStyles.flexItemsCenter,
                            ]}>
                                        <MaterialCommunityIcons name='qrcode-scan'
                                            size={30}
                                            color={StyleConfig.color_primary}
                                            style={[CommonStyles.background_transparent]} />
                                
                            </View>
                        </TouchableHighlight>
                            
                        </View>
                    </View>
                    <View style={[styles.section]}>
                        {/*
                        <View style={[{ flex: 5 }, styles.row]}>
                            <Text style={[styles.title]}>Range</Text>
                            <Button onPress={this.selectPrinter} title="Page 2" />
                        </View>
                        {this.renderSpacer()}
                        */}

                        <View style={[{ flex: 1 }, styles.row]}>
                            <Text style={[styles.title]}>{this.state.copies} {translate(this.state.copies > 1 ? 'Copies' : 'Copy')}</Text>
                            <SegmentedControlIOS
                                style={{ width: 120 }}
                                momentary={true}
                                values={['-', '+']}
                                // selectedIndex={this.state.selectedIndex}
                                // onChange={(event) => {
                                //     this.setState({ selectedIndex: event.nativeEvent.selectedSegmentIndex });
                                // }}
                                onValueChange={(value) => {
                                    var copies = this.state.copies;
                                    switch (value) {
                                        case '-':
                                            if (copies > 1) copies--;
                                            break;
                                        case '+':
                                            copies++;
                                            break;
                                        default:
                                            break;
                                    }

                                    this.setState({ copies });
                                }}
                            />
                        </View>
                    </View>

                    <View style={[styles.section]}>
                        <View style={[{ flex: 1 }, styles.row, {
                            justifyContent: 'center',
                            alignItems: 'center',
                        }]}>
                            <Button onPress={this.print.bind(this)} title={translate('Print')} />
                        </View>
                    </View>
                    <View style={[styles.section]}>
                        <View style={[{ flex: 1 }, styles.row, {
                            justifyContent: 'center',
                            alignItems: 'center',
                        }]}>
                            {this.renderPreview()}
                        </View>
                    </View>
                </ScrollView>
            );

        return (
            <QrCodeScannerScreen
                onSuccess={this.qrCodeReceived.bind(this)}
                onCancel={() => { this.setState({ requestingQR: false }) }}
            />
        );
    }

    // @NOTE iOS Only
    selectPrinter = async () => {
        const selectedPrinter = await RNPrint.selectPrinter()
        this.setState({ selectedPrinter })
    }

    selectPrinterWithUrl = async () => {
        const selectedPrinter = await RNPrint.selectPrinterWithUrl({
            printerURL: this.state.selectedPrinter.url
        })
        this.setState({ selectedPrinter })
    }

    print = async () => {
        const { file } = this.props.navigation.state.params;
        var filePath = file.uri;

        if (filePath.indexOf('file://') == 0)
            filePath = filePath.replace('file://', '')
        let copies = this.state.copies;
        for (i = 0; i < copies; i++) {
            await RNPrint.print2({
                copies,
                filePath
            })
        }
    }

    scanQRCode = () => {
        this.setState({ requestingQR: true })
    }


    // QR
    _renderTitleBar() {
        return (
            <Text
                style={{ color: 'white', textAlignVertical: 'center', textAlign: 'center', font: 20, padding: 12 }}
            >Here is title bar</Text>
        );
    }

    _renderMenu() {
        return (
            <Text
                style={{ color: 'white', textAlignVertical: 'center', textAlign: 'center', font: 20, padding: 12 }}
            >Here is bottom menu</Text>
        )
    }

    qrCodeReceived(e) {
        // alert('Type: ' + e.type + '\nData: ' + e.data);
        this.setState({ requestingQR: false, printerUrl: e.data }, async () => {
            const selectedPrinter = await RNPrint.selectPrinterWithUrl({
                printerURL: e.data
            })
            this.setState({ selectedPrinter });
        });
    }

    renderPreview() {
        const { file } = this.props.navigation.state.params;
        if (!file) return null;

        return (
            <FileViewerIOS
                style={{
                    flex: 1,
                    width,
                    height
                }}
                url={file.uri}
            />
        );
    }

    convertToPdf(file) {

        const { uri, fileType, fileName } = file;
        var newPath = uri + '.pdf';
        return new Promise((resolve, reject) => {
            RNFS.readFile(uri, 'base64') // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
                .then((content) => {

                    // convert to pdf
                    convert(fileName, fileType, content)
                        .then(pdfContent => {
                            if (!pdfContent) {
                                reject(new Error('Conversion failed.'));
                                return false;
                            }
                            // save to a new path
                            RNFS.writeFile(newPath, pdfContent, 'base64')
                                .then(() => {
                                    resolve(newPath);
                                })
                                .catch((err) => {
                                    reject(err);
                                });;
                        })
                })
                .catch((err) => {
                    reject(err);
                });
        })
    }
}

export default PrintInteractionScreen;

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