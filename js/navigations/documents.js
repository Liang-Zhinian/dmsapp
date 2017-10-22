'use strict'

// React
import React from 'react'

// Navigation
import { addNavigationHelpers } from 'react-navigation'
import { DocumentsStackView } from '../components/stackNavigation'

// Redux
import { connect } from 'react-redux'

// Icon
import Icon from 'react-native-vector-icons/FontAwesome'


const mapStateToProps = (state) => {
    return {
        nv: state.nv
    }
}

class DocumentsNavigation extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Documents',
        tabBarIcon: ({ tintColor }) => <Icon size={20} name={'cogs'} color={tintColor} />
    }

    render() {
        const { nvState, dispatch } = this.props
        return (
            <DocumentsStackView
                navigation={
                    addNavigationHelpers({
                        dispatch: dispatch,
                        state: nvState
                    })
                }
            />
        )
    }
}
export default connect(mapStateToProps)(DocumentsNavigation)