import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableHighlight,
	Platform,
	Dimensions,
	Image,
	TouchableOpacity,
	DeviceEventEmitter,
	AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
import { DrawerNavigator, NavigationActions } from 'react-navigation'
import { default as Icon } from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { default as Ionicons } from 'react-native-vector-icons/Ionicons';
import { HeaderButton } from './components/HeaderButtons';
import { login, logout, valid } from '../../../actions/auth';
import requireAuth from '../../../HOC/require_auth';

import {
	ComponentStyles,
	CommonStyles,
	colors,
	StyleConfig,
} from '../styles';

const firstLineItems = [{
	title: 'My Documents',
	color: StyleConfig.color_white,
	// icon: 'cloud',
	icon: (<Octicons name='file-submodule'
		size={36}
		color={StyleConfig.color_white}
		style={[CommonStyles.m_b_1, CommonStyles.background_transparent]} />),
	route: 'ExplorerTab',
},
{
	title: 'Search',
	color: StyleConfig.color_white,
	icon: 'search',
	route: 'SearchTab',
}];

const secondLineItems = [{
	title: 'Downloads',
	color: StyleConfig.color_white,
	icon: 'cloud-download',
	route: 'Downloads',
}, {
	title: 'My Storage',
	color: StyleConfig.color_white,
	icon: (<FontAwesome name='pie-chart'
		size={36}
		color={StyleConfig.color_white}
		style={[CommonStyles.m_b_1, CommonStyles.background_transparent]} />),
	route: 'RepositoryUsage',
},];

const thirdLineItems = [
	{
		title: 'Documents Checked Out',
		color: StyleConfig.color_white,
		// icon: 'ios-cash',
		icon: (<FontAwesome name='briefcase'
			size={36}
			color={StyleConfig.color_white}
			style={[CommonStyles.m_b_1, CommonStyles.background_transparent]} />),
		route: 'CheckedoutReport',
	},
	{
		title: 'Documents Locked',
		color: StyleConfig.color_white,
		// icon: 'delete',
		icon: (<MaterialCommunityIcons name='file-lock'
			size={36}
			color={StyleConfig.color_white}
			style={[CommonStyles.m_b_1, CommonStyles.background_transparent]} />),
		route: 'LockedReport',
	}];

const fourthLineItems = [
	{
		title: 'Profile',
		color: StyleConfig.color_white,
		icon: 'account-circle',
		route: 'Profile',
	}, {
		title: 'Settings',
		color: StyleConfig.color_white,
		icon: 'settings',
		route: 'Settings',
	},];

class Home extends Component {
	static navigationOptions = ({ navigation }) => {
		const { params = {} } = navigation.state;

		return {
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
{params.isLoggedIn &&
					<HeaderButton
						onPress={params.onLogoutButtonPressed}
						text='Log Out!'
					/>}
				</View>
			),
		}
	};

	constructor(props) {
		console.log('constructor');
		super(props);
		this.state = {
			hasFocus: false,
			layout: {
				width: Dimensions.get('window').width,
				height: Dimensions.get('window').height,
			}
		};

		this.onLayout = this.onLayout.bind(this);
		this._bootstrapAsync();
	}

	// Fetch the token from storage then navigate to our appropriate place
	_bootstrapAsync = async () => {
		const { login, valid, auth } = this.props;
		const { user } = auth;
		
		if (!user) {
			this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'Login' }));
			return;
		}

		if (user.token.sid) {
			let isValid = await valid(user.token.sid);
			console.log(`isValid: ${isValid}`);
			if (!isValid) {
				console.log(`login again`);
				await login(user.username, user.password);
			}
		}
	};

	_signOutAsync = async () => {
		const { logout, auth } = this.props;
		const { user } = auth;
		
		if (!user) {
			this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'Login' }));
			return;
		}

		const sid = auth.user.token.sid;
		await logout(sid);
	}

	componentDidFocus() {
		this.setState({
			hasFocus: true
		});
	}

	componentWillMount() {
	}

	componentDidMount() {
		console.log('componentDidMount');
		const { navigation } = this.props;
		// We can only set the function after the component has been initialized
		navigation.setParams({
			onLogoutButtonPressed: this._signOutAsync.bind(this),
			isLoggedIn: this.props.auth.isLoggedIn,
		});
	}

	componentWillUnmount() {
		console.log('componentWillUnmount');
	}
	
	onNavItemPress(item) {
		if (item && item.route) {
			const { navigate } = this.props.navigation;
			navigate(item.route);

		}
	}

	onLayout(e) {
		this.setState({
			layout: {
				width: Dimensions.get('window').width,
				height: Dimensions.get('window').height,
			}
		})
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
				style={[CommonStyles.m_b_1, CommonStyles.background_transparent]} />;
		else
			icon = item.icon;
		return (
			<TouchableHighlight
				key={index}
				onPress={() => this.onNavItemPress(item)}
				style={[CommonStyles.flex_1,
				CommonStyles.p_a_2,
				CommonStyles.border_t,
				CommonStyles.border_r,
				CommonStyles.border_b,
				CommonStyles.border_l,
				CommonStyles.flexItemsCenter,
				styles.cell]}
				underlayColor={StyleConfig.touchable_press_color}>
				<View style={[CommonStyles.flexColumn,
				CommonStyles.flexItemsMiddle,
				CommonStyles.flexItemsCenter,]}>
					{icon}
					<Text style={[CommonStyles.font_xs, CommonStyles.text_white]}>
						{item.title}
					</Text>
				</View>
			</TouchableHighlight>
		)
	}

	renderLogo() {
		return (
			<View style={[
				CommonStyles.flex_1,
				CommonStyles.flexItemsCenter,
				CommonStyles.flexItemsMiddle,
			]}>
				<Image
					style={[styles.image, { width: this.state.layout.width - 50, }]}
					resizeMode={Image.resizeMode.contain}
					source={require("../assets/logo2.png")}
				/>

			</View>
		)
	}

	renderNavContent() {
		return (
			<View style={[CommonStyles.flex_4, CommonStyles.flexColumn]}>
				<View style={[CommonStyles.flex_1, CommonStyles.flexRow, styles.row]}>
					{
						firstLineItems && firstLineItems.map((nav, index) => {
							return this.renderNavItem(nav, index)
						})
					}
				</View>
				{/*this.renderSpacer()*/}
				<View style={[CommonStyles.flex_1, CommonStyles.flexRow, styles.row]}>
					{
						secondLineItems && secondLineItems.map((nav, index) => {
							return this.renderNavItem(nav, index)
						})
					}
				</View>
				{/*this.renderSpacer()*/}
				<View style={[CommonStyles.flex_1, CommonStyles.flexRow, styles.row, styles.lastRow]}>
					{
						thirdLineItems && thirdLineItems.map((nav, index) => {
							return this.renderNavItem(nav, index)
						})
					}
				</View>
				{/*this.renderSpacer()*/}
				<View style={[CommonStyles.flex_1, CommonStyles.flexRow, styles.row, styles.lastRow]}>
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
			<View style={[/*CommonStyles.flex_1, CommonStyles.flexSelfTop,*/ { borderColor: 'grey', borderWidth: 2 }]}>
				{/*this.renderLogo()*/}
				{this.renderNavContent()}
				{/*<Text>Hello World</Text>*/}
			</View>
		)
	}

	render() {
		const { router, user } = this.props;
		return (
			<View
				onLayout={this.onLayout}
				style={[styles.container, { flexDirection: 'column' }]}
			>
				{/*this.renderContent()*/}
				{this.renderLogo()}
				{this.renderNavContent()}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		//alignItems: 'center',
		//justifyContent: 'center',
		//width: null,
		//height: null,
		backgroundColor: colors.primary,
	},
	row: {
		//flex: 1,
		//width: StyleConfig.screen_width,

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
		//flex: 1,
		//marginLeft: 30,
		//marginRight: 30,
		// marginTop: 0,
		// marginBottom: 0,
		// width: Dimensions.get("window").width - 50,
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

const mapStateToProps = (state) => {
	return {
		auth: state.auth
	};
}
const mapDispatchToProps = (dispatch) => {
	return {
		valid: (sid) => dispatch(valid(sid)),
		logout: (user) => dispatch(logout(user)),
		login: (username, password) => dispatch(login(username, password)),
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(requireAuth(Home));