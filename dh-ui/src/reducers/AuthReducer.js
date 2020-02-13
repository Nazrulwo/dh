import {
  SIGNIN,
  SIGNIN_FAILED,
  SIGNOUT
} from '../actions/types'
  
const INITIAL_STATE = {
  username: '',
  password: '',
  error: '',
}
  
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SIGNIN:
    return { ...state, username: action.payload.username, password: action.payload.password, error: '' }
  case SIGNIN_FAILED:
    return { ...state, username: '', password: '', error: action.payload }
  case SIGNOUT:
    return INITIAL_STATE
  default:
    return state
  }
}
