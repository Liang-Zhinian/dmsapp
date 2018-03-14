// we need this to properly go from child to parent navigator while resetting
// if you do the normal reset method from a child navigator:
this.props.navigation.dispatch({
    type: 'Navigation/RESET',
    index: 0,
    actions: [{ type: 'Navigate', routeName: 'SomeRootScreen' }]
})

// you will see an error about big red error message and
// screen must be in your current stack 
// don't worry, I got your back. do this
// (remember, this is in the context of an action creator):
import { NavigationActions } from 'react-navigation'

// notice how we passed in this.props.navigation from the component,
// so we can just call it like Dan Abramov mixed with Gandolf
export const handleSubmit = (token, navigation) => async (dispatch) => {
    try {
        // lets do some operation with the token
        await AsyncStorage.setItem('token@E1', token)
        // let's dispatch some action that doesn't itself cause navigation
        // if you get into trouble, investigate shouldComponentUpdate()
        // and make it return false if it detects this action at this moment
        dispatch({ type: SOMETHING_COMPLETE })

        // heres where it gets 100% crazy and exhilarating
        return navigation.dispatch(NavigationActions.reset({
            // this says put it on index 0, aka top of stack
            index: 0,
            // this key: null is 9001% critical, this is what
            // actually wipes the stack
            key: null,
            // this navigates you to some screen that is in the Root Navigation Stack
            actions: [NavigationActions.navigate({ routeName: 'SomeRootScreen' })]
        }))
    } catch (error) {
        dispatch({ type: SOMETHING_COMPLETE })
        // User should login manually if token fails to save
        return navigation.dispatch(NavigationActions.reset({
            index: 0,
            key: null,
            actions: [NavigationActions.navigate({ routeName: 'Login' })]
        }))
    }
}