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
    View
} from 'react-native';
import {VictoryPie} from "victory-native";

const data = [
    [0, 1],
    [1, 3],
    [3, 7],
    [4, 9],
];

export default class LockedReport extends Component<{}> {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                Locked Report
                </Text>

                <VictoryPie
                    data={[
                        { x: "Cats", y: 35 },
                        { x: "Dogs", y: 40 },
                        { x: "Birds", y: 55 }
                    ]}
                />
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
        width: 200,
        height: 200,
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});
