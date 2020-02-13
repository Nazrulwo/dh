// Router Actions added
// import { Actions } from 'react-native-router-flux';
import {
  SIGNIN,
  SIGNIN_FAILED,
  SIGNOUT
} from './types'

// For redirect
import history from '../history'

export const signInUserAction = (loginInfo, users) => {
  
  if (users.filter(user => user.username === loginInfo.username && user.password === loginInfo.password ).length !== 0 ) {
    document.body.classList.add(loginInfo.username);
    history.push('/home');

    return {
      type: SIGNIN,
      payload: loginInfo,
    };  
  } else {
    console.log('1123123123');

    return {
      type: SIGNIN_FAILED,
      payload: 'signin failed',
    };  
  }
}

export const signOutUserAction = () => {

  const clsname=document.body.classList.value;
  document.body.classList.remove(clsname);
  history.push('/login')
  
  window.persistor.purge()
  return {
    type: SIGNOUT
  }
}

