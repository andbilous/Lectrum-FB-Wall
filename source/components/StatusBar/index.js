import React, { Component } from "react";

import { withProfile } from "../../components/HOC/withProfile";

import Styles from "./styles.m.css";
@withProfile
class StatusBar extends Component {
  render() {
    const { currentUserFirstName, avatar } = this.props;

    return (
      <section className={Styles.statusBar}>
        <button>
          <img src={avatar} />
          <span> {currentUserFirstName} </span> &nbsp;
        </button>
      </section>
    );
  }
}
export default withProfile(StatusBar);
