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
        headerTitle: 'Operation Activity Summary',
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
                   source={require("../../images/OperationActivitySummary.png")} />
                
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
        // width: 1050,
        // height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
        height: 230
    },
});

export default IsdReportsUseView;

