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

const {
    Downloads,
    Account,
    Settings,
    More
} = Routes; 

export default MoreStack = StackNavigator({
    More,
    Downloads,
    Account,
    Settings,
}, {
        headerMode: 'screen',
        navigationOptions: {
            ...defaultHeader
        }
    })

