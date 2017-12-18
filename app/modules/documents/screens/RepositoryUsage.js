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
} from 'react-native';
import { VictoryPie } from "victory-native";
const { width, height } = Dimensions.get('window');

const data = [
    [0, 15000000],
    [1, 35000000],
];

export default class RepositoryUsage extends Component<{}> {
    static navigationOptions = {
        headerTitle: 'My Storage',
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    My Storage
                </Text>
                <View style={styles.chart}>
                    <VictoryPie
                        domainPadding={20}
                        height={width * 0.9}
                        width={width * 0.9}
                        // y="temp"
                        interpolation="cardinal"
                        // style={{ data: { fill: '#000000', opacity: 0.7 } }}
                        labels={(d) => `${d.x}: ${d.y}`}
                        data={[
                            { x: "已使用", y: 15000000 },
                            { x: "剩余", y: 35000000 },
                        ]}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    chart: {
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
