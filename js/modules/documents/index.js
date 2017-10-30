import { NAME } from './constants'
import App from './components/DocumentsView'
import reducer from './reducers'
import * as actions from './actions'
import Navigation from './Navigation'
import Views from './views'

//to reduce the number of bugs, make sure not to export action types.
//action types are internal only and only actions and reducer should access them

export default {
  NAME,
  App,
  reducer,
  actions,
  Navigation,
  Views,
}
