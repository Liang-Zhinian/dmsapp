import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableHighlight
} from 'react-native';
import { DrawerNavigator } from 'react-navigation'

import Icon from 'react-native-vector-icons/Ionicons';
import { StyleConfig, ComponentStyles, CommonStyles } from '../style';

const firstLineItems = [
	{
		title: 'Documents',
		color: StyleConfig.color_primary,
		icon: 'ios-cloud-outline',
		route: 'Documents',
	}, {
		title: 'Search',
		color: StyleConfig.color_danger,
		icon: 'ios-search-outline',
		route: 'Search',
	}];

const secondLineItems = [{
	title: 'Downloads',
	color: StyleConfig.color_primary,
	icon: 'ios-cloud-download-outline',
	route: 'Downloads',
}, {
	title: 'Account',
	color: StyleConfig.color_danger,
	icon: 'ios-contact-outline',
	route: 'Account',
}];

const thirdLineItems = [{
	title: 'Settings',
	color: StyleConfig.color_primary,
	icon: 'ios-settings-outline',
	route: 'Settings',
}, {
	title: 'About',
	color: StyleConfig.color_danger,
	icon: 'ios-information-circle-outline',
	route: 'About',
}];

class HomeView extends Component {

	constructor(props) {
		super(props);
		this.state = {
			hasFocus: false
		};
		// this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	componentDidFocus() {
		this.setState({
			hasFocus: true
		});
	}

	onNavItemPress(item) {
		if (item && item.route) {
			const { navigate } = this.props.navigation;
			navigate(item.route);

		}
	}

	renderSpacer() {
		return (
			<View style={styles.spacer}></View>
		)
	}

	renderNavItem(item, index) {
		return (
			<TouchableHighlight
				key={index}
				onPress={() => this.onNavItemPress(item)}
				style={[CommonStyles.flex_1, CommonStyles.p_a_3]}
				underlayColor={StyleConfig.touchable_press_color}>
				<View style={[CommonStyles.flexColumn, CommonStyles.flexItemsMiddle, CommonStyles.flexItemsCenter]}>
					<Icon name={item.icon}
						size={36}
						color={item.color}
						style={[CommonStyles.m_b_2, CommonStyles.background_transparent]} />
					<Text style={[CommonStyles.font_xs, CommonStyles.text_dark]}>
						{item.title}
					</Text>
				</View>
			</TouchableHighlight>
		)
	}

	renderNavContent() {
		return (
			<View>
				<View style={[CommonStyles.flexRow, styles.row]}>
					{
						firstLineItems && firstLineItems.map((nav, index) => {
							return this.renderNavItem(nav, index)
						})
					}
				</View>
				{this.renderSpacer()}
				<View style={[CommonStyles.flexRow, styles.row]}>
					{
						secondLineItems && secondLineItems.map((nav, index) => {
							return this.renderNavItem(nav, index)
						})
					}
				</View>
				{this.renderSpacer()}
				<View style={[CommonStyles.flexRow, styles.row]}>
					{
						thirdLineItems && thirdLineItems.map((nav, index) => {
							return this.renderNavItem(nav, index)
						})
					}
				</View>
				{this.renderSpacer()}
			</View>
		)
	}

	renderContent() {
		return (
			<View>
				{this.renderNavContent()}
			</View>
		)
	}

	render() {
		const { router, user } = this.props;
		return (
			<View style={ComponentStyles.container}>
				{this.renderContent()}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	row: {
		width: StyleConfig.screen_width
	},
	list_icon: {
		width: StyleConfig.icon_size
	},
	spacer: {
		height: 10,
		backgroundColor: StyleConfig.panel_bg_color
	}
});

export default HomeView;