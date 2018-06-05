import React, { Component } from 'react';
import {
    ScrollView,
    FlatList,
    TouchableOpacity,
    View,
    Text,
} from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { getItem } from '../services/storageService'
import I18n, { getLanguages, translate, changeLocale } from '../i18n/i18n';
import configureNavigationOptions from '../components/EditableNavigationOptions';
import Styles from '../styles'
import { HeaderButton } from '../components/HeaderButtons';
import { confirm } from '../common/alert';

const CommonStyles = Styles.CommonStyles;
const StyleConfig = Styles.StyleConfig;

class MyListItem extends React.PureComponent {

    _onPress = () => {
        this.props.onPressItem(this.props.id);
    };

    render() {
        const textColor = "black";
        return (
            <TouchableOpacity
                style={{
                    paddingLeft: 10,
                    paddingRight: 10,
                    paddingBottom: 5,
                    // paddingTop: 5,
                    height: 60
                }}
                onPress={this._onPress}>
                <View style={[{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                ]}>

                    <Text style={{ flex: 1, color: textColor, fontSize: 16 }}>
                        {this.props.title}
                    </Text>
                    {this.props.selected && <Ionicons name='ios-checkmark-outline'
                        size={35}
                        color={StyleConfig.color_black}
                        style={[CommonStyles.background_transparent]} />}
                </View>
                <View style={{
                    margin: 5,
                    height: 1,
                    backgroundColor: '#dddddd'
                }} />
            </TouchableOpacity >
        );
    }
}


class Globalization extends React.PureComponent {
    static navigationOptions = ({ navigation }) => {
        const {
            params = {
                // onCancel: () => null,
                // onToggleEdit: () => null,
                // isEditMode: false,
                // title: 'Title'
            }
        } = navigation.state;

        let headerTitle = translate('Globalization');
        let headerLeft = (
            <View style={[
                CommonStyles.flexRow,
                CommonStyles.m_l_2,
            ]}>
                <HeaderButton
                    onPress={() => {
                        navigation.goBack();
                    }}
                    text={translate('Cancel')}
                />
            </View>
        );
        let headerRight = (
            <View style={[
                CommonStyles.flexRow,
            ]}>
                <HeaderButton
                    onPress={params.save}
                    text={translate('Done')}
                    disabled={params.isDoneButtonDisabled}
                    textStyle={{
                        fontSize: 20
                    }}
                />

            </View>
        );
        return { headerLeft, headerTitle, headerRight };
    };

    state = {
        selected: (new Map(): Map<string, boolean>),
        data: []
    };

    _keyExtractor = (item, index) => item.id;

    _onPressItem = (id: string) => {
        // updater functions are preferred for transactional updates
        this.setState((state) => {
            // copy the map rather than modifying state.
            const selected = new Map(state.selected);

            selected.forEach(function (value, key) {
                console.log(key + " = " + value);
                if (key !== id) selected.set(key, false);
            }, selected);

            if (!selected.get(id)) selected.set(id, !selected.get(id)); // toggle
            return { selected };
        });

        let isDoneButtonDisabled = false;
        if (this.props.locale != id)
            isDoneButtonDisabled = false;
        else
            isDoneButtonDisabled = true;

        this.props.navigation.setParams({
            isDoneButtonDisabled
        });
    };

    _renderItem = ({ item }) => (
        <MyListItem
            id={item.id}
            onPressItem={this._onPressItem}
            selected={!!this.state.selected.get(item.id)}
            title={item.title}
        />
    );

    componentWillMount() {
        getLanguages().then(languages => {
            var list = [];
            for (i = 0; i < languages.length; i++) {
                var item = {};
                item.id = languages[i];
                item.title = translate(languages[i]);

                list.push(item);
            }
            this.setState((state) => {
                const selected = new Map(state.selected);

                languages.forEach(function (language) {
                    if (language === I18n.locale) selected.set(language, true);
                }, languages);

                return { selected, data: list };
            });
        });

        this.props.navigation.setParams({
            save: this.save.bind(this),
            isDoneButtonDisabled: true
        });
    }

    render() {
        return (
            <ScrollView style={{
                marginTop: 50
            }}>
                <FlatList
                    data={this.state.data}
                    extraData={this.state}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />
            </ScrollView>
        );
    }

    save = () => {
        const { selected } = this.state;

        function each(value, key) {
            if (value) {
                changeLocale(key);
                this.props.changeLocale(key);
                return false;
            }
        }
        confirm(null, translate('MsgResetLanguage'), () => { selected.forEach(each.bind(this), selected); })

    }

    cancel = () => {
        const { navigation } = this.props;

    }
}

function select(store) {
    return {
        locale: store.locale.default
    };
}

function dispatch(dispatch) {
    return {
        changeLocale: (locale) => dispatch({ type: 'CHANGED_LOCALE', payload: { locale } }),
    }
};

export default connect(select, dispatch)(Globalization);