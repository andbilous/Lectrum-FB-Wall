import React, { Component } from "react";
import moment from "moment";
import { func, string, number, array } from "prop-types";

import Like from "components/Like";
import { withProfile } from "../../components/HOC/withProfile";
import Styles from "./styles.m.css";

@withProfile
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

  render() {
    const {
      comment,
      created,
      _likePost,
      id,
      likes,
      avatar,
      currentUserFirstName,
      currentUserLastName
    } = this.props;

    return (
      <section className={Styles.post}>
        <span className={Styles.cross} onClick={this._onDeletePostHandler} />
        <img src={avatar} />{" "}
        <a>
          {" "}
          {`${currentUserFirstName}
          ${currentUserLastName}`}{" "}
        </a>
        <time> {moment.unix(created).format("YYYY MMMM D h:mm:ss")} </time>
        <p>{comment}</p>
        <Like _likePost={_likePost} id={id} likes={likes} />
      </section>
    );
  }
}

export default withProfile(Post);
