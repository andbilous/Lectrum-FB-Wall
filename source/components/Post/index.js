import React, { Component } from "react";
import moment from "moment";
import PropTypes from "prop-types";

import { Consumer } from "../../components/HOC/withProfile";
import Styles from "./styles.m.css";

export default class Post extends Component {
  static PropTypes = {
    comment: PropTypes.string.isRequired,
    created: PropTypes.number.isRequired
  };

  render() {
    const { comment, created } = this.props;

    return (
      <Consumer>
        {context => (
          <section className={Styles.post}>
            <img src={context.avatar} />{" "}
            <a>
              {" "}
              {`${context.currentUserFirstName}
          ${context.currentUserLastName}`}{" "}
            </a>
            <time> {moment.unix(created).format("YYYY MMMM D h:mm:ss")} </time>
            <p>{comment}</p>
          </section>
        )}
      </Consumer>
    );
  }
}
