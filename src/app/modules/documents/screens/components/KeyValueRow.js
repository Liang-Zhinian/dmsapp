import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

export default class KeyValueRow extends Component {

    constructor(props) {
        super(props);
    }


    render() {

        const title = this.props.title || 'Title';
        return (
            <View style={styles.container}>
                <Text style={[styles.key]}>{title}</Text>
                <View style={[styles.value]}>
                    {
                        this.props.children
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#ffffff',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    key: {
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'left',
        fontSize: 17,
    },
    value: {
        flex: 2,
        // marginLeft: 10,
        // marginRight: 10,
    },
});
