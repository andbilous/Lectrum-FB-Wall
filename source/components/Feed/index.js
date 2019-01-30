import React, { Component } from "react";
import moment from "moment";

import Composer from "./../Composer/index";
import Post from "../Post/index";
import StatusBar from "../StatusBar/index";
import Spinner from "../Spinner";

import Styles from "./styles.m.css";
import { getUniqueID, delay } from "instruments";

export default class Feed extends Component {
  constructor() {
    super();
    this._createPost = this._createPost.bind(this);
    this._setPostsFetchingState = this._setPostsFetchingState.bind(this);
    this._likePost = this._likePost.bind(this);
    this._deletePost = this._deletePost.bind(this);
  }

  state = {
    posts: [
      { id: "123", comment: "Привет1", created: 1548462238, likes: [] },
      { id: "456", comment: "Привет2", created: 1548462138, likes: [] },
      { id: "4562", comment: "Привет3", created: 1548462138, likes: [] },
      { id: "456532", comment: "Привет4", created: 1548462138, likes: [] }
    ],
    isPostsFetching: false
  };

  _setPostsFetchingState(state) {
    this.setState({
      isPostsFetching: state
    });
  }

  async _createPost(comment) {
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
  }

  async _deletePost(id) {
    if (!id) {
      return null;
    }
    await delay(1200);
    let newPosts = this.state.posts;
    newPosts = newPosts.filter(function(post) {
      return post.id !== id;
    });
    this.setState({
      posts: newPosts
    });
  }

  async _likePost(id) {
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
  }

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
