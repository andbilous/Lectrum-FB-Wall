import React, { Component } from "react";

import Styles from "./styles.m.css";
import { withProfile } from "../HOC/withProfile";
import { Transition } from "react-transition-group";
import { fromTo } from "gsap";

class Postman extends Component {
  _animatePostmanEnter = Postman => {
    fromTo(Postman, 3, { opacity: 0 }, { opacity: 1 });
  };

  _animatePostmanEntered = Postman => {
    console.log("Postman Entered");
    fromTo(Postman, 3, { opacity: 1 }, { opacity: 0 });
  };

  render() {
    return (
      <Transition
        appear
        in
        timeout={2000}
        onEnter={this._animatePostmanEnter}
        onEntered={this._animatePostmanEntered}
      >
        <section className={Styles.postman}>
          <img src={this.props.avatar} />
          <span>Welcome online, {this.props.currentUserFirstName}</span>
        </section>
      </Transition>
    );
  }
}
export default withProfile(Postman);
