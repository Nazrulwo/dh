// @flow
import React, { Component } from 'react';
import LoginForm from '../components/LoginForm/LoginForm';
import { Provider } from 'react-redux';
import store from '../redux/store';

class Login extends Component {
  render() {
    return (
      <div className="login-form d-flex flex-column align-items-center">
        <Provider store={store}>
          <LoginForm />
        </Provider>
      </div>
    );
  }
}
export default Login;