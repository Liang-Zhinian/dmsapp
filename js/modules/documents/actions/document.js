import { GET_CONTENT } from '../constants'
import * as API from '../api/api'
import Base64 from '../lib/Base64'

export type Action = {
  type: string,
  payload?: {
    content: string
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
export const getContent = (username: string, password: string, docId: number): ActionAsync => {
  return (dispatch, getState) => {
    API.getContent(username, password, docId)
      .then(([response, responseText]) => {
        let content = '';
        if (response.ok) {

          dispatch({
            type: GET_CONTENT,
            payload: {
              content: responseText,
              docId,
            }
          })
        } else{
          dispatch({
            type: 'ERROR',
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
