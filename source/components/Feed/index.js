import React, { Component } from "react";

import Composer from "./../Composer/index";
import Post from "../Post/index";
import StatusBar from "../StatusBar/index";
import Spinner from "../Spinner";

import Styles from "./styles.m.css";

export default class Feed extends Component {
  state = {
    posts: [
      { id: "123", comment: "Hi there", created: 1548462238 },
      { id: "456", comment: "Приветик", created: 1548462138 }
    ],
    isSpinning: false
  };

  render() {
    const { posts } = this.state;
    const postsJSX = posts.map(post => {
      return <Post key={post.id} {...post} />;
    });

    return (
      <section className={Styles.feed}>
        <Spinner isSpinning={this.state.isSpinning} />
        <StatusBar />
        <Composer />
        {postsJSX}
      </section>
    );
  }
}
