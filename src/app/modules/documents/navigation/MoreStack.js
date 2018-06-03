import React from 'react'
import {
    TouchableOpacity
} from 'react-native';
import {
    StackNavigator,
} from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Routes from '../config/routes';
import { defaultHeader } from './styles';
import { stackNavigationOptions } from './util';
import UpdateScreen from '../../../components/UpdateScreen';
import GlobalizationScreen from '../../../screens/Globalization';

const {
    Downloads,
    Account,
    Settings,
    More,
    Profile,
    Server
} = Routes;

export default MoreStack = StackNavigator({
    More,
    Downloads,
    Account,
    Settings,
    Update: {
        screen: UpdateScreen,
    },
    Profile,
    Server,
    Globalization: {
        screen: GlobalizationScreen
    }
}, {
        headerMode: 'screen',
        initialRouteName: 'More',
        navigationOptions: {
            ...defaultHeader
        }
    })

