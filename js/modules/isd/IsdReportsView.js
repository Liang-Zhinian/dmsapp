import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    ScrollView,
    TouchableWithoutFeedback
} from 'react-native';
import { StyleConfig, ComponentStyles, CommonStyles } from '../../style';
import colors from '../../common/colors'

class IsdReportsView extends Component {
    static navigationOptions = {
        // headerVisible: false,
        headerTitle: 'ISD Reports',
    }
    render() {
        const { router, user } = this.props;
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>

                    <TouchableWithoutFeedback onPress={()=>navigate('IsdReportsUse')}>
                        <View style={styles.button}>
                            <Text>Operation Activity Summary</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={()=>navigate('IsdReportsExpenses')}>
                        <View style={styles.button}>
                            <Text>Overall Activity Summary</Text>
                        </View>
                    </TouchableWithoutFeedback>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    image: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height + 100,
    },
    button:{
        margin: 20,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 6,
        height: 30,
        "borderTopColor": colors.borderOnPrimary,
        "borderTopWidth": 1,
        "borderRightColor": colors.borderOnPrimary,
        "borderRightWidth": 1,
        "borderBottomColor": colors.borderOnPrimary,
        "borderBottomWidth": 1,
        "borderLeftColor": colors.borderOnPrimary,
        "borderLeftWidth": 1,
    }
});

export default IsdReportsView;