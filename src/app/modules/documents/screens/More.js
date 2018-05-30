import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    Platform,
    Dimensions,
    ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';

import {
    ComponentStyles,
    CommonStyles,
    colors,
    StyleConfig,
} from '../styles';
import { translate } from '../../../i18n/i18n';
import { logout } from '../../../actions/auth';

const MainRoutes = [
    {
        title: translate('Downloads'),
        color: StyleConfig.color_white,
        icon: 'ios-cloud-download-outline',
        id: 'Downloads',
        type: 'Route'
    },/* {
        title: translate('Account'),
        color: StyleConfig.color_white,
        icon: 'ios-contact-outline',
        id: 'Account',
        type: 'Route'
    }, {
        title: translate('Settings'),
        color: StyleConfig.color_white,
        icon: 'ios-settings-outline',
        id: 'Settings',
        type: 'Route'
    }, {
        title: translate('About'),
        color: StyleConfig.color_white,
        icon: 'ios-information-circle-outline',
        id: 'About',
        type: 'Route'
    },*/
    {
        title: translate('Profile'),
        color: StyleConfig.color_white,
        icon: 'ios-person-outline',
        id: 'Profile',
        type: 'Route'
    },/* {
        title: translate('CheckForUpdate'),
        color: StyleConfig.color_white,
        icon: 'ios-settings-outline',
        id: 'Update',
        type: 'Route'
    },*/{
        title: translate('ChangeServer'),
        color: StyleConfig.color_white,
        icon: (<Octicons name='server'
            size={36}
            color={StyleConfig.color_white}
            style={[CommonStyles.m_b_1, CommonStyles.background_transparent]} />),
        id: 'Server',
        type: 'Route'
    }, {
        title: translate('SignOut'),
        color: StyleConfig.color_white,
        icon: 'ios-log-out-outline',
        id: 'SignOut',
        type: 'Button',
        onPress: async function () {
            const { logout, token } = this.props;
            await logout(token.sid);
        },

    },
];

class More extends Component {
    static navigationOptions = {
        headerTitle: translate('More'),
    };

    constructor(props) {
        super(props);
        this.state = {
            screen: {
                width: StyleConfig.screen_width,
                height: StyleConfig.screen_height
            }
        };

        Dimensions.addEventListener('change', (dimensions) => {
            // you get:
            //  dimensions.window.width
            //  dimensions.window.height
            //  dimensions.screen.width
            //  dimensions.screen.height
            this.setState({
                screen: {
                    width: dimensions.window.width,
                    height: dimensions.window.height
                }
            })
        });
    }

    render() {
        const { router, user } = this.props;
        return (
            <ScrollView
                style={styles.root}
                contentContainerStyle={styles.rootContainer}>
                {this.renderGrid()}
            </ScrollView>
        )
    }

    isLandscape() {
        return this.state.screen.width > this.state.screen.height;
    }

    renderSpacer() {
        return (
            <View style={styles.spacer}></View>
        )
    }

    getEmptyCount(size) {
        let rowCount = Math.ceil((this.state.screen.height - 20) / size);
        return rowCount * 2 - MainRoutes.length;
    }

    renderRoute(route, index) {

        const size = this.state.screen.width / 2;
        // const height = width;
        return (
            <TouchableHighlight
                key={index}
                onPress={route.type == 'Button' ? route.onPress.bind(this) : () => {
                    this.props.navigation.navigate(route.id);
                }}
                style={[{
                    width: size,
                    height: size,
                },
                CommonStyles.flexItemsMiddle,
                CommonStyles.flexItemsCenter,
                styles.cell
                ]}
                underlayColor={StyleConfig.touchable_press_color}>
                <View style={[
                    CommonStyles.flexColumn,
                    CommonStyles.flexItemsMiddle,
                    CommonStyles.flexItemsCenter,
                ]}>
                    {
                        typeof route.icon === 'string' ?
                            <Icon name={route.icon}
                                size={40}
                                color={route.color}
                                style={[CommonStyles.m_b_2, CommonStyles.background_transparent]} />
                            : route.icon
                    }
                    <Text style={[CommonStyles.font_xs, CommonStyles.text_white]}>
                        {route.title}
                    </Text>
                </View>
            </TouchableHighlight>
        )
    }

    renderGrid() {
        let items = <View />;
        let size = this.state.screen.width / 2;
        let emptyCount = this.getEmptyCount(size);

        items = MainRoutes.map((route, index) => {
            return this.renderRoute(route, index)
        });


        for (let i = 0; i < emptyCount; i++) {
            items.push(<View key={'empty' + i} style={[{ height: size, width: size }, styles.empty]} />)
        }

        return items;
    }
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: colors.primary,
    },
    rootContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    cell: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.borderOnPrimary
    },
    spacer: {
        height: 10,
        backgroundColor: StyleConfig.panel_bg_color
    },
    empty: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.borderOnPrimary
    },
});

const mapStateToProps = (state) => {
    return {
        token: state.auth.token || {},
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        logout: (user) => dispatch(logout(user)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(More);
