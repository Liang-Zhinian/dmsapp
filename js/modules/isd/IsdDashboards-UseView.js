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

class IsdDashboardsUseView extends Component {
    static navigationOptions = {
        // headerVisible: false,
        headerTitle: 'ISD Dashboards - Usage',
    }
    render() {
        const { router, user } = this.props;
        return (
            <View style={styles.container}>
                <ScrollView 
minimumZoomScale={1.0}
maximumZoomScale={2}
showsVerticalScrollIndicator={true}
showsHorizontalScrollIndicator={true}
centerContent={true} style={[
                    // CommonStyles.flexRow,
                    // CommonStyles.flexColumn,
                    // CommonStyles.flexItemsMiddle,
                    // CommonStyles.flexItemsBetween,
                    // CommonStyles.flexItemsCenter,
                    // CommonStyles.background_light,
                ]}>
                    <Image style={styles.image} resizeMode={Image.resizeMode.contain} source={require("../../images/UsageDashboard.png")} />
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    image: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
});

export default IsdDashboardsUseView;

