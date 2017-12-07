import { createAction } from 'redux-actions';
import moment from 'moment';
import { SAVE_ACCOUNT, LOGIN, RENEW, VALID } from '../constants'
import { loginSOAP, validSOAP, renewSOAP } from '../api'


export type Action = {
  type: string,
  payload?: {
    username: string,
    password: string,
    token: any
  }
}

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
  return (dispatch, getState) => {

    dispatch(saveAccount(username, password))

    loginSOAP(username, password)
      .then(sid => {
        let expires_date = moment();
        expires_date.add(25, 'minutes');
        expires_date = expires_date.format('YYYY-MM-DD HH:mm:ss')
        dispatch({
          type: LOGIN,
          payload: {
            // username,
            // password,
            token: {
              sid,
              expires_date,
            },
          }
        });
      })
      .catch((error) => {
        dispatch({
          type: 'ERROR',
          error
        })
      })
  }
}

export const renew = (sid: string) => async (dispatch, getState) => {
  // Make API call and dispatch appropriate actions when done

  const response = await renewSOAP(sid)
    .then(response => {
      // console.log('renew => reponse:' + response);

      let expires_date = moment();
      expires_date.add(25, 'minutes');
      expires_date = expires_date.format('YYYY-MM-DD hh:mm:ss')
      dispatch({
        type: RENEW,
        payload: {
          token: {
            sid,
            expires_date,
          },
        }
      })
    })
    .catch((error) => {
      dispatch({
        type: 'ERROR',
        error
      })
    })
}

export const valid = (sid: string) => async (dispatch, getState) => {
  // Make API call and dispatch appropriate actions when done

  validSOAP(sid)
    .then(valid => {
      dispatch({
        type: VALID,
        payload: {
          valid: valid === 'true'
        }
      });
    })
    .catch((error) => {
      dispatch({
        type: 'ERROR',
        error
      });
    })

}

export const saveAccount = (username: string, password: string): Action => {
  return {
    type: SAVE_ACCOUNT,
    payload: {
      username,
      password,
    }
  };
}