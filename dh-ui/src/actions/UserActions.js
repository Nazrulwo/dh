import {
  ADD_USER,
  ADD_USER_FAILED,
} from './types'
import history from '../history'

// For redirect
// import history from '../history'

export const addUserAction = (newUser, users) => {
  if (users.filter(user => user.username === newUser.username).length === 0) {
    history.push('/login');
    return {
      type: ADD_USER,
      payload: newUser,
    }
  } else {
    return {
      type: ADD_USER_FAILED,
      payload: "Username exist",
    }
  }
}
