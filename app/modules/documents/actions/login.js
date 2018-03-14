import {
    INITIALIZE_APP,
    LOGIN_INITIALIZE,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from '../constants';

//INITIALIZE APP
// this isn't done, no try/catch and LOGIN_FAIL isn't hooked up
// but you get the idea
// if a valid JWT is detected, they will be navigated to WeLoggedIn
export const initializeApp = () => {
    return async (dispatch) => {
        dispatch({ type: INITIALIZE_APP })

        // const user = await AsyncStorage.getItem('token')
        //     .catch((error) => dispatch({ type: LOGIN_FAIL, payload: error }))
        const user = { id: 'xxx' };

        if (!user) return dispatch({ type: LOGIN_FAIL, payload: 'No Token' })

        return dispatch({
            type: LOGIN_SUCCESS,
            payload: user
        })
        // navigation.navigate('WeLoggedIn')
        // pass navigation into this function if you want
    }
}

export const logout = () => { 
    return async (dispatch) => {
        dispatch({ type: LOGOUT })
    }
}
