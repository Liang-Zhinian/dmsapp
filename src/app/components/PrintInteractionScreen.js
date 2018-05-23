//@flow

import React, { Component } from 'react';
import {
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
} from 'react-native';
import RNPrint from 'react-native-print';
// import { QRScannerView } from 'ac-qrcode';

// import RNPrint from './RCTPrint';

class PrintInteractionScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;

        let headerTitle = 'Printer Options';
        let headerLeft = (
            <View style={[
                CommonStyles.flexRow,
            ]}>
                <TouchableOpacity
                    style={{ marginRight: 14, justifyContent: 'center' }}
                    accessibilityLabel='cancel'
                    onPress={() => { navigation.goBack(null) }}
                >
                    <Text style={{ color: '#ffffff', fontSize: 20 }}>Cancel</Text>
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
            printerUrl: null
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
                            <Text style={[styles.title]}>Printer</Text>
                            <Button onPress={this.selectPrinter} title={this.state.selectedPrinter ? this.state.selectedPrinter.name : 'Select Printer'} />
                            {/* <Button onPress={this.scanQRCode} title='Scan' /> */}
                            <Button onPress={this.selectPrinterWithUrl} title='Select Printer With Url' />
                        </View>
                    </View>
                    <View style={[styles.section]}>
                        <View style={[{ flex: 5 }, styles.row]}>
                            <Text style={[styles.title]}>Range</Text>
                            <Button onPress={this.selectPrinter} title="Page 2" />
                        </View>
                        {this.renderSpacer()}

                        <View style={[{ flex: 5 }, styles.row]}>
                            <Text style={[styles.title]}>1 Copy</Text>
                            <Button onPress={this.selectPrinter} title="Page 2" />
                        </View>
                    </View>

                    <View style={[styles.section]}>
                        <View style={[{ flex: 1 }, styles.row]}>
                            <Button onPress={this.print} title="Print" />
                        </View>
                    </View>
                </ScrollView>
            );

        // return <QRScannerView
        //     onScanResultReceived={this.barcodeReceived.bind(this)}

        //     renderTopBarView={() => this._renderTitleBar()}

        //     renderBottomMenuView={() => this._renderMenu()}
        // />
    }

    // @NOTE iOS Only
    selectPrinter = async () => {
        const selectedPrinter = await RNPrint.selectPrinter()
        this.setState({ selectedPrinter })
        alert('Printer url: \n' + selectedPrinter.url);
    }

    selectPrinterWithUrl = async () => {
        const selectedPrinter = await RNPrint.selectPrinterWithUrl({
            printerURL: this.state.selectedPrinter.url
        })
        this.setState({ selectedPrinter })
    }

    async print() {
        await RNPrint.print({
            html: '<h1>Heading 1</h1><h2>Heading 2</h2><h3>Heading 3</h3>'
        })
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

    barcodeReceived(e) {
        alert('Type: ' + e.type + '\nData: ' + e.data);
        this.setState({ requestingQR: false, printerUrl: e.data })
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
        justifyContent: 'flex-start',
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