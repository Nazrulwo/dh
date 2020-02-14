// @flow
import React, { Component } from "react";
import LoginForm from "../components/LoginForm/LoginForm";
import { Provider, connect } from "react-redux";
import store from "../redux/store";
export const Login = ({ state, dispatch }) => {
    return (
        <div className="login-form d-flex flex-column align-items-center">
            <LoginForm state={state} dispatch={dispatch} />
        </div>
    );
};

const mapStateToProps = state => ({
    state
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withConnect(Login);
