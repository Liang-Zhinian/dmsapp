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

class App extends Component {
    static navigationOptions = {
        // headerVisible: false,
        headerTitle: 'ISD Dashboards',
    }
    render() {
        const { router, user } = this.props;

        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>

                <TouchableWithoutFeedback onPress={() => navigate('IsdDashboardsUse')}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>ISD Dashboard - Usage</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => navigate('IsdDashboardsExpenses')}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>ISD Dashboard - Expense</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => navigate('IsdReportsUse')}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Operation Activity Summary</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => navigate('IsdReportsExpenses')}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Overall Activity Summary</Text>
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
    button: {
        margin: 20,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 6,
        height: 30,
        // "borderTopColor": colors.borderOnPrimary,
        // "borderTopWidth": 1,
        // "borderRightColor": colors.borderOnPrimary,
        // "borderRightWidth": 1,
        // "borderBottomColor": colors.borderOnPrimary,
        // "borderBottomWidth": 1,
        // "borderLeftColor": colors.borderOnPrimary,
        // "borderLeftWidth": 1,
        backgroundColor: colors.borderOnPrimary,
    },
    buttonText:{
        color: colors.textOnPrimary
    },
});

export default App;