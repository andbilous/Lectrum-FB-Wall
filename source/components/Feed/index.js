import React, { Component } from "react";
import moment from "moment";

import { withProfile } from "components/HOC/withProfile";
import Composer from "./../Composer/index";
import Post from "../Post/index";
import StatusBar from "../StatusBar/index";
import Spinner from "../Spinner";

import Styles from "./styles.m.css";
import { getUniqueID, delay } from "instruments";

class Feed extends Component {
  state = {
    posts: [
      { id: "123", comment: "Привет1", created: 1548462238, likes: [] },
      { id: "456", comment: "Привет2", created: 1548462138, likes: [] },
      { id: "4562", comment: "Привет3", created: 1548462138, likes: [] },
      { id: "456532", comment: "Привет4", created: 1548462138, likes: [] }
    ],
    isPostsFetching: false
  };

  _setPostsFetchingState = state => {
    this.setState({
      isPostsFetching: state
    });
  };

  _createPost = async comment => {
    this._setPostsFetchingState(true);
    const post = {
      id: getUniqueID(),
      created: moment.utc(),
      comment,
      likes: []
    };
    await delay(1200);

    this.setState(({ posts }) => ({
      posts: [post, ...posts],
      isPostsFetching: false
    }));
  };

  _deletePost = async id => {
    if (!id) {
      return null;
    }
    await delay(1200);
    this.setState(({ posts }) => ({
      posts: posts.filter(post => post.id !== id)
    }));
  };

  _likePost = async id => {
    const { currentUserFirstName, currentUserLastName } = this.props;
    this._setPostsFetchingState(true);
    await delay(1200);
    const newPosts = this.state.posts.map(post => {
      if (post.id === id) {
        return {
          ...post,
          likes: [
            {
              id: getUniqueID(),
              firstName: currentUserFirstName,
              lastName: currentUserLastName
            }
          ]
        };
      }

      return post;
    });
    this.setState({
      posts: newPosts,
      isPostsFetching: false
    });
  };

  render() {
    const { posts } = this.state;
    const postsJSX = posts.map(post => {
      return (
        <Post
          key={post.id}
          {...post}
          _deletePost={this._deletePost}
          _likePost={this._likePost}
        />
      );
    });

    return (
      <section className={Styles.feed}>
        <Spinner isSpinning={this.state.isPostsFetching} />
        <StatusBar />
        <Composer _createPost={this._createPost} />
        {postsJSX}
      </section>
    );
  }
}
export default withProfile(Feed);
