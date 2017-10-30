import { createAction } from 'redux-actions';
import { LOGIN, RENEW, VALID } from '../constants'
import * as API from '../api/api'
import XMLParser from '../lib/XMLParser'

function toJson(xmlString) {
  var xmlParser = new XMLParser();
  var xmlDoc = xmlParser.parseFromString(xmlString);
  let json = xmlParser.toJson(xmlDoc);
  return json;
}


export type Action = {
  type: string,
  payload?: {
    sid: string
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

//this action tell the reducer which account with specified username & password needs to be
//verified.
export const login = (username: string, password: string): ActionAsync => {
  return (dispatch, getState) => {
    API.login(username, password)
      .then(([response, responseText]) => {
        let json = toJson(responseText);
        if (response.ok) {
          let sid = json.Body.loginResponse.return;

          dispatch({
            type: LOGIN,
            payload: {
              username,
              password,
              sid,
            }
          })
        } else{
          dispatch({
            type: 'ERROR',
            username,
            password,
            error: responseText
          })
        }
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
  try {


    // const valid = await API.valid(sid)
    //   .then(([response, responseText]) => {
    //     let json = toJson(responseText);
    //     return json.Body.validResponse.return === 'true';
    //   })
    //   .catch((error) => {
    //     dispatch({
    //       type: 'ERROR',
    //       error
    //     });
    //     return false;
    //   })

    // dispatch({
    //   type: VALID,
    //   payload: {
    //     valid
    //   }
    // });

    // if (!valid) {
    const response = await API.renew(sid)
      .then(([response, reponseText]) => {
        console.log('renew => reponseText:' + reponseText);
        return true;
      })
      .catch((error) => {
        dispatch({
          type: 'ERROR',
          error
        })
      })
    // }
    dispatch({
      type: RENEW,
    });
  } catch (error) {
    dispatch({
      type: 'ERROR',
      error
    })
  }
}

export const valid = (sid: string) => async (dispatch, getState) => {
  // Make API call and dispatch appropriate actions when done
  try {

    const valid = await API.valid(sid)
      .then(([response, responseText]) => {
        let json = toJson(responseText);
        return json.Body.validResponse.return === 'true';
      })
      .catch((error) => {
        dispatch({
          type: 'ERROR',
          error
        });
        return false;
      })

    dispatch({
      type: VALID,
      payload: {
        valid
      }
    });
  } catch (error) {
    dispatch({
      type: 'ERROR',
      error
    })
  }
}