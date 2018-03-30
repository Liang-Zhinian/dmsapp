import React from 'react';
import {
    AsyncStorage
} from 'react-native';
import { createAction } from 'redux-actions';
import moment from 'moment';
import { loginSOAP, logoutSOAP, validSOAP, renewSOAP } from '../modules/documents/api';

export type ActionAsync = (dispatch: Function, getState: Function) => void

//each action should have the following signiture.
//  {
//     type: <type of action>,        type is required
//     payload: <the actual payload>  payload is optional. if you don't
//                                    have anything to send to reducer,
//                                    you don't need the payload.
//  }

/*
 *this action tell the reducer which account with specified username & password needs to be
 *verified.
 */
export const login = (username: string, password: string): ActionAsync => {
    return async (dispatch, getState) => {

        await loginSOAP(username, password)
            .then(sid => {
                console.log('loginSOAP returns');
                let expires_date = moment();
                expires_date.add(25, 'minutes');
                expires_date = expires_date.format('YYYY-MM-DD HH:mm:ss')

                const user = {
                    username,
                    password,
                    token: {
                        sid,
                        expires_date,
                    }
                };
                // await AsyncStorage.setItem('userToken', user);

                dispatch({
                    type: 'Login',
                    payload: { user }
                })

            })
            .catch((error) => {
                dispatch({
                    type: 'ERROR',
                    error
                })
            })

    }
}

export const logout = (sid: string): ActionAsync => {
    return async (dispatch, getState) => {
        await logoutSOAP(sid)
            .then(result => {
                console.log(`logoutSOAP.result.${result}`);

                dispatch({ type: 'Logout' });

            })
            .catch((error) => {
                dispatch({
                    type: 'ERROR',
                    error
                })
            })

        // await AsyncStorage.clear();
        // dispatch({ type: 'Logout' });
    }
}

export const valid = (sid: string): ActionAsync => {
    return async (dispatch, getState) => {
        let valid = await validSOAP(sid)
            .then(valid => {
                console.log('validSOAP returns');
                return valid == true;
            })
            .catch((error) => {
                dispatch({
                    type: 'ERROR',
                    error
                });
            })
        return valid;
    }
}