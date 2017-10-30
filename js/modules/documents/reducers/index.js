
import { handleActions } from 'redux-actions'
import { LOGIN, RENEW, VALID, GET_CONTENT } from '../constants'

type State = {
  isLoggedIn: boolean,
  username: ?string,
  password: ?string,
  sid: ?string,
}

const initialState: State = {
  isLoggedIn: false,
  username: null,
  password: null,
  sid: null,
}

//you can do better here, I was just showing that you need to make a new copy
//of state. It is ok to deep copy of state. It will prevent unseen bugs in the future
//for better performance you can use immutableJS

//handleActions is a helper function to instead of using a switch case statement,
//we just use the regular map with function state attach to it.

export default handleActions(
  {
    [LOGIN]: (state: State = initialState, action) => {
      const { payload: { username, password, sid } } = action

      //because payload contains the id and we already know that we are about
      //to increment the value of that id, we modify only that value by one

      return {
        ...state,
        username,
        password,
        sid,
        isLoggedIn: true,
      }
    },

    [RENEW]: (state: State = initialState, action) => {
      return {
        ...state,
        isLoggedIn: true,
      }
    },

    [VALID]: (state: State = initialState, action) => {
      const { payload: { valid } } = action
      return {
        ...state,
        isLoggedIn: valid,
      }
    },

    [GET_CONTENT]: (state: State = initialState, action) => {
      const { payload: { content, docId } } = action
      return {
        ...state,
        content,
        docId,
      }
    },

    // Handle API request errors
    ['ERROR']: (state: State = initialState, action) => { return initialState; },

  },
  initialState
)