import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableHighlight,
	Platform,
	Dimensions,
	Image,
	TouchableOpacity
} from 'react-native';
import { DrawerNavigator } from 'react-navigation'
import { default as Icon } from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {default as Ionicons} from 'react-native-vector-icons/Ionicons';


// import { default as Icon } from 'react-native-vector-icons/Ionicons';
import { StyleConfig, ComponentStyles, CommonStyles } from '../../style';
import colors from '../../common/colors'

const firstLineItems = [{
	title: 'Documents',
	color: StyleConfig.color_white,
	// icon: 'cloud',
	icon: (<Octicons name='file-submodule'
		size={36}
		color={StyleConfig.color_white}
		style={[CommonStyles.m_b_2, CommonStyles.background_transparent]} />),
	route: 'Documents',
},
{
	title: 'Search',
	color: StyleConfig.color_white,
	icon: 'search',
	route: 'Search',
}];

const secondLineItems = [{
	title: 'Downloads',
	color: StyleConfig.color_white,
	icon: 'cloud-download',
	route: 'Downloads',
},
{
	title: 'Account',
	color: StyleConfig.color_white,
	icon: 'account-circle',
	route: 'Account',
}];

const thirdLineItems = [{
	title: 'Settings',
	color: StyleConfig.color_white,
	icon: 'settings',
	route: 'Settings',
},
{
	title: 'Expenses',
	color: StyleConfig.color_white,
	// icon: 'ios-cash',
	icon: (<Ionicons name='ios-cash'
		size={36}
		color={StyleConfig.color_white}
		style={[CommonStyles.m_b_2, CommonStyles.background_transparent]} />),
	route: 'Expense',
}];

const fourthLineItems = [{
	title: 'ISD Dashboards',
	color: StyleConfig.color_white,
	icon: (<FontAwesome name='pie-chart'
		size={36}
		color={StyleConfig.color_white}
		style={[CommonStyles.m_b_2, CommonStyles.background_transparent]} />),
	route: 'IsdDashboards',
},
{
	title: 'Helpdesk',
	color: StyleConfig.color_white,
	// icon: 'delete',
	icon: (<MaterialCommunityIcons name='table-edit'
		size={36}
		color={StyleConfig.color_white}
		style={[CommonStyles.m_b_2, CommonStyles.background_transparent]} />),
	route: 'Helpdesk',
}];

class App extends Component {
	static navigationOptions = {
		// headerStyle: { backgroundColor: colors.primary },
		// headerTintColor: colors.textOnPrimary,
		headerTitle: 'Home',
		headerLeft: (
			<TouchableOpacity
				style={{ marginLeft: 14 }}
				accessibilityLabel='bell'
			>
				<MaterialCommunityIcons
					name='bell-outline'
					size={24}
					style={{ color: colors.textOnPrimary }}
				/>
			</TouchableOpacity>
		),
		headerRight: (
			<View style={[
				// CommonStyles.headerRight,
				CommonStyles.flexRow,
				// CommonStyles.flexItemsMiddle, 
				// CommonStyles.flexItemsBetween,
			]}>
				<TouchableOpacity
					style={{ marginRight: 14 }}
					accessibilityLabel='info'
				>
					<Icon
						name='info-outline'
						size={24}
						style={{ color: colors.textOnPrimary }}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					style={{ marginRight: 14 }}
					accessibilityLabel='help'
				>
					<Icon
						name='help-outline'
						size={24}
						style={{ color: colors.textOnPrimary }}
					/>
				</TouchableOpacity>
			</View>
		),
	}

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
		let icon;
		if (typeof item.icon === 'string')
			icon = <Icon name={item.icon}
						size={36}
						color={item.color}
						style={[CommonStyles.m_b_2, CommonStyles.background_transparent]} />;
		else
			icon = item.icon;
		return (
			<TouchableHighlight
				key={index}
				onPress={() => this.onNavItemPress(item)}
				style={[CommonStyles.flex_1,
				CommonStyles.p_a_4,
				CommonStyles.border_t,
				CommonStyles.border_r,
				CommonStyles.border_b,
				CommonStyles.border_l,
				styles.cell]}
				underlayColor={StyleConfig.touchable_press_color}>
				<View style={[CommonStyles.flexColumn,
				CommonStyles.flexItemsMiddle,
				CommonStyles.flexItemsCenter,]}>
				{ icon }
					<Text style={[CommonStyles.font_xs, CommonStyles.text_white]}>
						{item.title}
					</Text>
				</View>
			</TouchableHighlight>
		)
	}

	renderAppInfo() {
		return (
			<View>
				{/* <View style={[
					CommonStyles.flexRow,
					CommonStyles.flexColumn,
					CommonStyles.flexItemsMiddle,
					CommonStyles.flexItemsBetween,
					CommonStyles.flexItemsCenter,
					// CommonStyles.background_light,
				]}>
					<Image style={styles.image} resizeMode={Image.resizeMode.contain} source={require("../images/logo2.png")} />
			</View> */}
				<View style={[CommonStyles.flexRow, CommonStyles.flexItemsMiddle, CommonStyles.flexItemsBetween]}>
					<View style={styles.container}>
						{/* <Text style={styles.welcome}>
							Welcome to RICOH ISD
				</Text> */}
						<Image style={styles.image} resizeMode={Image.resizeMode.contain} source={require("../../images/logo2.png")} />
						{/* <Text style={styles.instructions}>
							You have total of <Text style={{ fontWeight: 'bold' }}>53</Text> folders and <Text style={{ fontWeight: 'bold' }}>392</Text> files.
						</Text> */}
					</View>
				</View>
				{/*this.renderSpacer()*/}
			</View>
		)
	}

	renderFooter() {
		return (
			<View>
				<View style={[
					CommonStyles.flexRow,
					CommonStyles.flexColumn,
					CommonStyles.flexItemsMiddle,
					CommonStyles.flexItemsBetween,
					CommonStyles.flexItemsCenter,
					// CommonStyles.background_light,
				]}>
					<Image style={styles.image} resizeMode={Image.resizeMode.contain} source={require("../../images/logo2.png")} />
				</View>
				{this.renderSpacer()}
			</View>
		)
	}

	renderNavContent() {
		return (
			<View style={[styles.container]}>
				<View style={[CommonStyles.flexRow, styles.row]}>
					{
						firstLineItems && firstLineItems.map((nav, index) => {
							return this.renderNavItem(nav, index)
						})
					}
				</View>
				{/*this.renderSpacer()*/}
				<View style={[CommonStyles.flexRow, styles.row]}>
					{
						secondLineItems && secondLineItems.map((nav, index) => {
							return this.renderNavItem(nav, index)
						})
					}
				</View>
				{/*this.renderSpacer()*/}
				<View style={[CommonStyles.flexRow, styles.row, styles.lastRow]}>
					{
						thirdLineItems && thirdLineItems.map((nav, index) => {
							return this.renderNavItem(nav, index)
						})
					}
				</View>
				{/*this.renderSpacer()*/}
				<View style={[CommonStyles.flexRow, styles.row, styles.lastRow]}>
					{
						fourthLineItems && fourthLineItems.map((nav, index) => {
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
			<View style={[CommonStyles.flexSelfTop]}>
				{/*this.renderAppInfo()*/}
				{this.renderNavContent()}
				{this.renderFooter()}
				{/* <View style={[CommonStyles.flexRow]}>
					<Image style={styles.image} resizeMode={Image.resizeMode.contain} source={require("../images/logo2.png")} />
				</View> */}
			</View>
		)
	}

	render() {
		const { router, user } = this.props;
		return (
			<View style={[ComponentStyles.container, styles.container]}>
				{this.renderContent()}
			</View >
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		//justifyContent: 'center',
		alignItems: 'center',
		width: null,
		height: null,
		backgroundColor: colors.primary,
		// color: 'rgba(60, 177, 158, 1)'
	},
	row: {
		width: StyleConfig.screen_width,

		"borderTopColor": colors.borderOnPrimary,
		"borderTopWidth": 1,
		"borderRightColor": colors.borderOnPrimary,
		"borderRightWidth": 1,
		"borderBottomColor": colors.borderOnPrimary,
		"borderBottomWidth": 0,
		"borderLeftColor": colors.borderOnPrimary,
		"borderLeftWidth": 0,
	},
	lastRow: {
		"borderTopColor": colors.borderOnPrimary,
		"borderTopWidth": 1,
		"borderRightWidth": 1,
		"borderRightColor": colors.borderOnPrimary,
		"borderBottomWidth": 1,
		"borderBottomColor": colors.borderOnPrimary,
		"borderLeftColor": colors.borderOnPrimary,
		"borderLeftWidth": 0,
	},
	cell: {
		// height: 100,
		"borderTopColor": colors.borderOnPrimary,
		"borderTopWidth": 0,
		"borderRightColor": colors.borderOnPrimary,
		"borderRightWidth": 0,
		"borderBottomColor": colors.borderOnPrimary,
		"borderBottomWidth": 0,
		"borderLeftColor": colors.borderOnPrimary,
		"borderLeftWidth": 1,
		backgroundColor: '#0d7cd1'
	},
	list_icon: {
		width: StyleConfig.icon_size
	},
	spacer: {
		height: 10,
		backgroundColor: StyleConfig.background_transparent
	},
	hamburgerButton: {
		marginLeft: 14
	},
	image: {
		// marginTop: 0,
		// marginBottom: 0,
		width: Dimensions.get("window").width - 150,
		// height: 365 * (Dimensions.get("window").width - 150) / 651,
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		color: '#fff',
		margin: 5,
	},
	instructions: {
		fontSize: 12,
		textAlign: 'center',
		color: '#fff',
		marginBottom: 5,
	},
});

export default App;