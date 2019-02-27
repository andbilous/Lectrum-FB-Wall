// Core
import React, { Component } from "react";
import { hot } from "react-hot-loader";
import { Switch, Route, Redirect } from "react-router-dom";
import Catcher from "../../components/Catcher";
import Feed from "../../components/Feed/index";
import Profile from "../../components/Profile";
import StatusBar from "../../components/StatusBar";
import { Provider } from "../../components/HOC/withProfile";
import avatar from "../../theme/assets/lisa";

const options = {
  avatar,
  currentUserFirstName: "Андрей",
  currentUserLastName: "Белоус"
};
const loginBtnStyles = {
  marginTop: "1rem",
  marginLeft: "17rem"
};

@hot(module)
export default class App extends Component {
  state = {
    isAuthenticated: localStorage.getItem("isLoggedIn")
  };

  componentDidMount() {}

  logoutHandler = () => {
    this.setState({
      isAuthenticated: false
    });
    localStorage.setItem("isLoggedIn", "false");
  };

  loginHandler = () => {
    this.setState({
      isAuthenticated: true
    });
    localStorage.setItem("isLoggedIn", "true");
  };

  render() {
    const { isAuthenticated } = this.state;

    return (
      <Catcher>
        <Provider value={this.state}>
          <Provider value={options}>
            <StatusBar
              isLoggedIn={this.state.isAuthenticated}
              logout={this.logoutHandler}
            />{" "}
            <Switch>
              {" "}
              {isAuthenticated ? (
                <Switch>
                  <Route component={Feed} path="/feed" />
                  <Route component={Profile} path="/profile" />
                  <Redirect to="/feed" />
                </Switch>
              ) : (
                <button
                  id="loginBtn"
                  style={loginBtnStyles}
                  onClick={this.loginHandler}
                >
                  {" "}
                  Login
                </button>
              )}
            </Switch>
          </Provider>
        </Provider>
      </Catcher>
    );
  }
}
