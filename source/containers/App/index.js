// Core
import React, { Component } from "react";
import { hot } from "react-hot-loader";

import Catcher from "../../components/Catcher";
import Feed from "../../components/Feed/index";
import { Provider } from "../../components/HOC/withProfile";
import avatar from "../../theme/assets/lisa";

const options = {
  avatar,
  currentUserFirstName: "Андрей",
  currentUserLastName: "Белоус"
};

@hot(module)
export default class App extends Component {
  render() {
    return (
      <Catcher>
        <Provider value={options}>
          <Feed />
        </Provider>
      </Catcher>
    );
  }
}
