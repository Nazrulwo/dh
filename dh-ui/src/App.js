// @flow

import React, { Component } from "react";
import "./App.css";
import { Provider } from "react-redux";
import AppRoutes from "./AppRoutes";
import { PersistGate } from "redux-persist/es/integration/react";
import configureStore from "./store";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.baseURL = "http://3.15.42.194:9090/api/v1";

const { persistor, store } = configureStore();

const onBeforeLift = () => {
    // take some action before the gate lifts
};

class App extends Component {
    // eslint-disable-next-line camelcase
    render() {
        return (
            <Provider store={store}>
                <PersistGate
                    // loading={<Loading />}
                    onBeforeLift={onBeforeLift}
                    persistor={persistor}
                >
                    <AppRoutes />
                    <ToastContainer
                        position="top-right"
                        autoClose={2000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnVisibilityChange
                        draggable
                        pauseOnHover
                    />
                </PersistGate>
            </Provider>
        );
    }
}

export default App;
