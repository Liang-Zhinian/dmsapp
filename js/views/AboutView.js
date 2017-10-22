import React, { Component } from 'react';
import {
	View,
	TouchableOpacity,
	Text,
	StyleSheet
} from 'react-native';

class AboutView extends Component {
	render() {
		const { router, user } = this.props;
		return (
			<View style={styles.container}>
				<Text>
					About View
				</Text>
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
});

export default AboutView;