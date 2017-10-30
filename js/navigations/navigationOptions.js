import React from 'react'
import { TouchableOpacity, StyleSheet, Platform, Animated, Easing } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Octicons from 'react-native-vector-icons/Octicons'
// import { DoveStyleConfig, DoveStyles } from '../style';
import colors from '../common/colors'

export const drawerViewNavigationOptions = (label: string, iconName: string) => {
    return {
        drawerLabel: label,
        drawerIcon: ({ tintColor }) => (
            <MaterialIcons
                name={iconName}
                size={24}
                style={{ color: tintColor }}
                accessibilityLabel={label}
            />
        )
    }
}

const styles = StyleSheet.create({
    hamburgerButton: {
        marginLeft: 14
    }
})

const drawerButton = (navigation) => (
    <TouchableOpacity
        style={styles.hamburgerButton}
        onPress={() => navigation.navigate('DrawerToggle')}
        accessibilityLabel='menu'
    >
        <MaterialIcons
            name='menu'
            size={24}
            style={{ color: colors.textOnPrimary }}
        />
    </TouchableOpacity>
)


export const stackNavigationOptions = () => {
    return ({ navigation }: { navigation: any }) => ({
        headerStyle: { backgroundColor: colors.primary, /*height: 35*/ },
        headerTintColor: colors.textOnPrimary,
        ...Platform.select({
            android: {
                headerLeft: (
                    drawerButton(navigation)
                )
            }
        })
    })
}

export const stackNavigationOptionsWithDrawerButton = () => {
    return ({ navigation }: { navigation: any }) => ({
        headerStyle: { backgroundColor: colors.primary, /*height: 35*/ },
        headerTintColor: colors.textOnPrimary,
    })
}


export const tabNavigationOptions = (label: string, iconName: string) => {
    return {
        tabBarLabel: label,
        tabBarIcon: ({ tintColor }) => (
            <Octicons
                name={iconName}
                size={26}
                style={{ color: tintColor }}
                accessibilityLabel={label}
            />
        )
    }
}


// https://github.com/react-community/react-navigation/issues/1254
export const noTransitionConfig = () => ({
    transitionSpec: {
        duration: 0,
        timing: Animated.timing,
        easing: Easing.step0
    }
})