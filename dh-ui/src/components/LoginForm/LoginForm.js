import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../../redux/reducer";
import "../../App.css";
import { Redirect } from "react-router-dom";
import logo from "../../images/logo.png";
import { Button, Input, FormGroup } from "reactstrap";
import axios from "axios";
import { successToast, errorToast } from "../../utils/toast";
import history from "../../history";

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSubmitButtonDisabled: false
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    render() {
        let { email, password } = this.state;
        let { isLoginPending, isLoginSuccess, loginError } = this.props;
        return (
            <div className="login-form d-flex flex-column align-items-center">
                <a href="#" className="siteLogo">
                    <img src={logo} className="App-logo" alt="logo" />
                </a>
                <div className="loginBox">
                    <h3 className="h3">Login</h3>
                    <form name="loginForm" onSubmit={this.onSubmit}>
                        <div className="form-group-collection">
                            <FormGroup>
                                <Input
                                    type="text"
                                    name="email"
                                    placeholder="Username"
                                    onChange={e =>
                                        this.setState({ email: e.target.value })
                                    }
                                    value={email}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    onChange={e =>
                                        this.setState({
                                            password: e.target.value
                                        })
                                    }
                                    value={password}
                                />
                            </FormGroup>
                        </div>
                        <Button
                            color="primary"
                            className="text-center"
                            onClick={this.handleKeyPress}
                            disabled={this.state.isSubmitButtonDisabled}
                        >
                            Sign in
                        </Button>

                        <div className="message">
                            {isLoginPending && <div>Please wait...</div>}
                            {isLoginSuccess && (
                                <div>
                                    <Redirect to="./home" />
                                </div>
                            )}
                            {loginError && <div>{loginError.message}</div>}
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    async onSubmit(e) {
        e.preventDefault();
        let { email, password } = this.state;

        // Disabled the button
        this.setState({
            ...this.state,
            isSubmitButtonDisabled: true
        });

        try {
            const response = await axios.post("/auth/login", {
                username: email,
                password
            });

            this.setState({
                email: "",
                password: ""
            });

            successToast("Login successful.");
            history.push("home");
        } catch (err) {
            if (err.response && err.response.data.message) {
                errorToast(err.response.data.message);
            } else {
                errorToast("Error occurred !!");
            }

            // Enable the button
            this.setState({
                ...this.state,
                isSubmitButtonDisabled: false
            });
        }
    }
}

const mapStateToProps = state => {
    return {
        isLoginPending: state.isLoginPending,
        isLoginSuccess: state.isLoginSuccess,
        loginError: state.loginError
    };
};

const mapDispatchToProps = dispatch => {
    return {
        login: (email, password) => dispatch(login(email, password))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
