import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    ScrollView
} from 'react-native';
import { StyleConfig, ComponentStyles, CommonStyles } from '../../style';

class IsdReportsUseView extends Component {
    static navigationOptions = {
        // headerVisible: false,
        headerTitle: 'Expense',
    }
    render() {
        const { router, user } = this.props;
        return (
            <ScrollView
                minimumZoomScale={1.0}
                maximumZoomScale={2}
                showsVerticalScrollIndicator={true}
                showsHorizontalScrollIndicator={true}
                style={styles.container}>
                <Image
                    style={styles.image}
                    resizeMode={Image.resizeMode.contain}
                    source={require("../../images/Expense2.png")} />

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // flexDirection: 'row',
        // justifyContent: 'flex-start',
        // alignItems: 'center',
        // backgroundColor: '#F5FCFF',
    },
    image: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
});

export default IsdReportsUseView;

