/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Image,
    Alert,
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    DeviceEventEmitter,
    ScrollView,
} from 'react-native';
import RicohScannerAndroid from '../../../components/RCTRicohScannerAndroid';

function alert(msg) {
    Alert.alert('Scan Module', msg, [{ text: 'OK', onPress: () => console.log('OK Pressed') },], { cancelable: false });
}

export default class Scan extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            connectState: '',
            scanJobState: '',
            scanServiceAttributeState: '',
            scanServiceAttributeListenerError: '',
            scanJobListenerError: '',
            scannedImage:''
        };
    }

    componentWillMount() {
        var that = this;

        DeviceEventEmitter.addListener('ConnectStateUpdated', function (e) {
            // alert("ConnectStateUpdated event listener success" + e.stateLabel);
            that.setState({ connectState: e.stateLabel });
        });
        DeviceEventEmitter.addListener('ScanServiceAttributeUpdated', function (e) {
            // alert("ScanServiceAttributeUpdated event listener success" + e.stateLabel);
            that.setState({ scanServiceAttributeState: e.stateLabel });
        });
        DeviceEventEmitter.addListener('ScanJobStateUpdated', function (e) {
            // alert("ScanJobStateUpdated event listener success" + e.stateLabel);
            that.setState({ scanJobState: e.stateLabel });
        });
        DeviceEventEmitter.addListener('ScanServiceAttributeListenerErrorUpdated', function (e) {
            // alert("ScanJobStateUpdated event listener success" + e.stateLabel);
            that.setState({ scanServiceAttributeListenerError: e.stateLabel });
        });
        DeviceEventEmitter.addListener('ScanJobListenerErrorUpdated', function (e) {
            // alert("ScanJobStateUpdated event listener success" + e.stateLabel);
            that.setState({ scanJobListenerError: e.stateLabel });
        });
        DeviceEventEmitter.addListener('ScannedImageUpdated', function (e) {
            // alert("ScanJobStateUpdated event listener success" + e.stateLabel);
            that.setState({ scannedImage: e.stateLabel });
        });
        
        

        that.init();
    }
    render() {
        return (
            <ScrollView contentContainerStyle={{justifyContent:'center', alignItems:'center'}} style={styles.container}>
                <Text style={styles.title}>
                    Scan
                </Text>
                <TouchableOpacity onPress={this.restore.bind(this)}>
                    <Text style={styles.scanButton}>Restore</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.start.bind(this)}>
                    <Text style={styles.scanButton}>Start scanning</Text>
                </TouchableOpacity>

                <Text style={styles.title}>Connection State: {this.state.connectState}</Text>
                <Text style={styles.title}>Scan Job State: {this.state.scanJobState}</Text>
                <Text style={styles.title}>Scan Service Attribute State: {this.state.scanServiceAttributeState}</Text>
                <Text style={styles.title}>Scan Job Attribute Listener Error: {this.state.scanServiceAttributeListenerError}</Text>
                <Text style={styles.title}>Scan Job Listener Error: {this.state.scanJobListenerError}</Text>
                <Text style={styles.title}>Scanned Image: {this.state.scannedImage}</Text>

                {/* <Image
					style={[{ width: this.state.layout.width - 50, }]}
					resizeMode={Image.resizeMode.contain}
					source={{uri:'file://'+this.state.scannedImage}}
				/> */}

            </ScrollView>
        );
    }

    start() {

        RicohScannerAndroid.start()
            .then((msg) => {
                console.log('success!!')
            }, (error) => {
                console.log('error!!')
            });
    }

    init() {

        RicohScannerAndroid.init()
            .then((msg) => {
                console.log('success!!')
            }, (error) => {
                console.log('error!!')
            });
    }

    restore() {

        RicohScannerAndroid.restore()
            .then((msg) => {
                console.log('success!!')
            }, (error) => {
                console.log('error!!')
            });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'flex-start',
        backgroundColor: '#F5FCFF',
    },
    title: {
        flex: 1,
        fontSize: 20,
        textAlign: 'left',
        margin: 10,
    },
    scanButton: {
        color: "green",
        fontSize: 17
    },
});
