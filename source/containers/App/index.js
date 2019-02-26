// Core
import React, { Component } from "react";
import { hot } from "react-hot-loader";
import { Switch, Route, Redirect } from "react-router-dom";
import Catcher from "../../components/Catcher";
import Feed from "../../components/Feed/index";
import Profile from "../../components/Profile";
import StatusBar from "../../components/StatusBar";
import Login from "../../components/Login";
import { Provider } from "../../components/HOC/withProfile";
import avatar from "../../theme/assets/lisa";

const options = {
  avatar,
  currentUserFirstName: "Андрей",
  currentUserLastName: "Белоус"
};

@hot(module)
export default class App extends Component {
  state = {
    isAuthenticated: false
  };

  componentDidMount() {
    //
  }

  logoutHandler = () => {
    this.setState({ isAuthenticated: false });
    <Redirect to="/login" />;
    localStorage.setItem("isLoggedIn", "false");
  };

  loginHandler = () => {
    this.setState({ isAuthenticated: true });
    <Redirect to="/profile" />;
    localStorage.setItem("isLoggedIn", "true");
  };

  render() {
    return (
      <Catcher>
        <Provider value={this.state}>
          <Provider value={options}>
            <StatusBar logout={this.logoutHandler} />
            <Switch>
              if(!this.state.isAuthenticated)
              {<Route component={Login} exact path="/login" />}
              <Route component={Feed} path="/feed" />
              <Route component={Profile} path="/profile" />
              <Provider value={this.state.isAuthenticated}>
                <Route component={Login} path="/login" />
              </Provider>
              <Redirect to="/feed" />
            </Switch>
          </Provider>
        </Provider>
      </Catcher>
    );
  }
}
