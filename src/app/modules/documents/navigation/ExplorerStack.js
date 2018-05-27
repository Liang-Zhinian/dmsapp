import React from 'react'
import {
    TouchableOpacity
} from 'react-native';
import {
    StackNavigator,
} from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import BottomTabs from './BottomTabs';
import Routes from '../config/routes';
import { defaultHeader } from './styles';
import { stackNavigationOptions } from './util';

const {
    Explorer,
    DocumentDetails,
    Upload,
    FileViewer,
    Print
} = Routes;

const ModalStack = StackNavigator({
    Print,
}, {
        mode: 'modal',
        headerMode: 'none',
        // initialRouteName: 'Explorer',
        navigationOptions: {
            ...defaultHeader
        }
    })


export default ExplorerStack = StackNavigator({
    Explorer,
    DocumentDetails,
    Upload,
    FileViewer,
    Print,
}, {
        headerMode: 'screen',
        // initialRouteName: 'Explorer',
        navigationOptions: {
            ...defaultHeader
        }
    })
