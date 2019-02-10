import React, { Component } from "react";
import { func, string, number, array } from "prop-types";
import moment from "moment";
import Like from "components/Like";
import { withProfile } from "../../components/HOC/withProfile";
import Styles from "./styles.m.css";

class Post extends Component {
  static propTypes = {
    id: string.isRequired,
    comment: string.isRequired,
    created: number.isRequired,
    _likePost: func.isRequired,
    _deletePost: func.isRequired,
    likes: array.isRequired
  };

  _onDeletePostHandler = () => {
    this.props._deletePost(this.props.id);
  };

  _getCross = () => {
    const {
      firstName,
      lastName,
      currentUserFirstName,
      currentUserLastName
    } = this.props;

    return `${firstName} ${lastName}` ===
      `${currentUserFirstName} ${currentUserLastName}` ? (
      <span className={Styles.cross} onClick={this._onDeletePostHandler} />
    ) : null;
  };

  render() {
    const {
      comment,
      created,
      _likePost,
      id,
      likes,
      avatar,
      firstName,
      lastName
    } = this.props;

    const cross = this._getCross();

    return (
      <section className={Styles.post}>
        {cross}
        <img src={avatar} />{" "}
        <a>
          {" "}
          {`${firstName}
          ${lastName}`}{" "}
        </a>
        <time> {moment.unix(created).format("YYYY MMMM D h:mm:ss")} </time>
        <p>{comment}</p>
        <Like _likePost={_likePost} id={id} likes={likes} />
      </section>
    );
  }
}

export default withProfile(Post);
