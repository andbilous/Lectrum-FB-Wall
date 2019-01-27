import React, { Component } from "react";
import moment from "moment";
import { func, string, number, array } from "prop-types";

import Like from "components/Like";
import { Consumer } from "../../components/HOC/withProfile";
import Styles from "./styles.m.css";

export default class Post extends Component {
  static propTypes = {
    id: string.isRequired,
    comment: string.isRequired,
    created: number.isRequired,
    _likePost: func.isRequired,
    _deletePost: func.isRequired,
    likes: array.isRequired
  };

  constructor() {
    super();
    this._onDeletePostHandler = this._onDeletePostHandler.bind(this);
  }

  _onDeletePostHandler() {
    this.props._deletePost(this.props.id);
  }

  render() {
    const { comment, created, _likePost, id, likes } = this.props;

    return (
      <Consumer>
        {context => (
          <section className={Styles.post}>
            <span
              className={Styles.cross}
              onClick={this._onDeletePostHandler}
            />
            <img src={context.avatar} />{" "}
            <a>
              {" "}
              {`${context.currentUserFirstName}
          ${context.currentUserLastName}`}{" "}
            </a>
            <time> {moment.unix(created).format("YYYY MMMM D h:mm:ss")} </time>
            <p>{comment}</p>
            <Like _likePost={_likePost} id={id} likes={likes} {...context} />
          </section>
        )}
      </Consumer>
    );
  }
}
