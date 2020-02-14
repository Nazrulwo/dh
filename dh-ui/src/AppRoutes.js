import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import history from "./history";
import Home from "./pages/Home";
import Login from "./pages/Login";
import "./App.css";
import { RoleOne } from "./pages/RoleOne";
import { RoleTwo } from "./pages/RoleTwo";
import { RoleThree } from "./pages/RoleThree";
import { Dashboard } from "./pages/Dashboard";
import { Settings } from "./pages/Settings";
import { Support } from "./pages/Support";
import { NoMatch } from "./pages/NoMatch";
import Register from "./pages/Register";

class AppRoutes extends Component {
    constructor(props) {
        super(props);
        if (props.username) {
            document.body.classList.add(props.username);
            console.log(props.username);
        }
    }

    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/home" component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/Dashboard" component={Dashboard} />
                    <Route path="/Settings" component={Settings} />
                    <Route path="/RoleOne" component={RoleOne} />
                    <Route path="/RoleTwo" component={RoleTwo} />
                    <Route path="/RoleThree" component={RoleThree} />
                    <Route path="/Support" component={Support} />
                    <Route component={NoMatch} />
                </Switch>
            </Router>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    const { username } = auth;
    return { username };
};

export default connect(mapStateToProps, {})(AppRoutes);
