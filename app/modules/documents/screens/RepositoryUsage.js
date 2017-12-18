/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Picker,
    PickerIOS,
    ScrollView
} from 'react-native';
import { VictoryPie } from "victory-native";
const { width, height } = Dimensions.get('window');
const PickerItemIOS = PickerIOS.Item;

export default class RepositoryUsage extends Component<{}> {
    static navigationOptions = {
        headerTitle: 'My Storage',
    };

    constructor(props) {
        super(props);
        this.state = {
            type: 'MyStorage',
            chartData: null
        }
    }

    componentWillMount() {
        this.setState({
            chartData: [
                { x: "已使用", y: 500000 },
                { x: "剩余", y: 5000000 },
            ]
        })
    }

    render() {
        return (
            <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                style={styles.container}>
                {Platform.OS === 'android' && <Picker
                    selectedValue={this.state.type}
                    onValueChange={this._onValueChanged.bind(this)}
                    style={{ marginBottom: 60, height: 100, width: 300 }}
                    mode={Picker.MODE_DIALOG}
                    // mode="dialog"
                    prompt='请选择操作语言'
                >
                    <Picker.Item label="My Storage" value="MyStorage" />
                    <Picker.Item label="Overall Storage (for Admin)" value="OverallStorage" />
                </Picker>}

                {Platform.OS === 'ios' && <PickerIOS
                    selectedValue={this.state.type}
                    onValueChange={this._onValueChanged.bind(this)}
                    style={{ marginBottom: 60, height: 100, width: 300 }}
                    itemStyle={{ fontSize: 25, color: 'black', textAlign: 'center', fontWeight: 'bold' }}
                >
                    <PickerItemIOS key='MyStorage' label="My Storage" value="MyStorage" />
                    <PickerItemIOS key='OverallStorage' label="Overall Storage (for Admin)" value="OverallStorage" />
                </PickerIOS>}

                <View style={styles.chart}>
                    <VictoryPie
                        domainPadding={20}
                        height={width * 0.9}
                        width={width * 0.9}
                        // y="temp"
                        interpolation="cardinal"
                        // style={{ data: { fill: '#000000', opacity: 0.7 } }}
                        // labels={(d) => `${d.x}: ${d.y}`}
                        data={this.state.chartData}
                    />
                </View>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    // height: 200,
                    width: width,
                    // backgroundColor: 'grey',
                    margin: 10,

                }}>
                    {this.state.chartData.map(item => {
                        return (<View
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                marginTop: 10,
                                marginLeft: 10,
                                // backgroundColor: 'grey',
                            }}>
                            <Text style={{ fontWeight: 'bold' }}>{item.x}: </Text><Text>{item.y} Bytes</Text>
                        </View>)
                    })}

                </View>
            </ScrollView>
        );
    }

    _onValueChanged(value) {
        let data = [];
        switch (value) {
            case 'MyStorage':
                data = [
                    { x: "已使用", y: 500000 },
                    { x: "剩余", y: 5000000 },
                ];
                break;
            case 'OverallStorage':
                data = [
                    { x: "已使用", y: 15000000 },
                    { x: "剩余", y: 35000000 },
                ];
                break;
            default:
                break;
        }

        this.setState({
            type: value,
            chartData: data,
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    chart: {
        // flex: 1,
        height: width * 0.9,
        width: width * 0.9,
        // width: 600,
        // height: 200,
        // margin: 50
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});
