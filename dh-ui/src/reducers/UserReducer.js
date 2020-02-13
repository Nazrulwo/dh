import {
  ADD_USER,
  ADD_USER_FAILED,
} from '../actions/types'

  
const INITIAL_STATE = {
  users: [],
  error: '',
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_USER:
    return { ...state, users: [...state.users, action.payload], error: '' }
  case ADD_USER_FAILED:
    return { ...state, error: action.payload }
  default:
    return state
  }
}
