import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	Image,
	ScrollView
} from 'react-native';
import { StyleConfig, ComponentStyles, CommonStyles } from '../../style';

class App extends Component {
	static navigationOptions = {
		// headerVisible: false,
		headerTitle: 'Settings',
	}
	render() {
		const { router, user } = this.props;
		return (
			<View style={styles.container}>
				<ScrollView style={[
					// CommonStyles.flexRow,
					// CommonStyles.flexColumn,
					// CommonStyles.flexItemsTop,
					// CommonStyles.flexItemsBetween,
					// CommonStyles.flexItemsAround,
					// CommonStyles.background_light,
				]}>
					<View><Image style={styles.image} resizeMode={Image.resizeMode.contain} source={require("../../images/Settings.png")} />
					</View></ScrollView>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	image: {
		marginTop: 0,
		// marginBottom: 0,
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height + 100,
	},
});

export default App;