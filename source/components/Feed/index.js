import React, { Component } from 'react';
import { Transition } from 'react-transition-group';
import { fromTo } from 'gsap';

import { withProfile } from 'components/HOC/withProfile';
import Catcher from '../Catcher/index';
import Composer from './../Composer/index';
import Post from '../Post/index';
import StatusBar from '../StatusBar/index';
import Spinner from '../Spinner';
import Postman from '../Postman/index';

import Styles from './styles.m.css';
import { api, TOKEN } from 'config/api';
import { socket } from 'socket/init';
import { GROUP_ID } from '../../config/api';

class Feed extends Component {
  state = {
      posts:           [],
      isPostsFetching: false,
  };

  componentDidMount() {
      const { currentUserFirstName, currentUserLastName } = this.props;
      this._fetchPosts();
      socket.emit('join', GROUP_ID);

      socket.on('create', (postJSON) => {
          const { data: createdPost, meta } = JSON.parse(postJSON);
          if (
              `${currentUserFirstName} ${currentUserLastName}`
        !== `${meta.authorFirstName} ${meta.authorLastName}`
          ) {
              this.setState(({ posts }) => ({
                  posts: [ createdPost, ...posts ],
              }));
          }
      });
      socket.on('remove', (postJSON) => {
          console.log(JSON.parse(postJSON));

          const { data: removedPost, meta } = JSON.parse(postJSON);
          if (
              `${currentUserFirstName} ${currentUserLastName}`
        !== `${meta.authorFirstName} ${meta.authorLastName}`
          ) {
              this.setState(({ posts }) => ({
                  posts: posts.filter((post) => post.id !== removedPost.id),
              }));
          }
      });
      socket.on('like', (postJSON) => {
          const { data: likedPost, meta } = JSON.parse(postJSON);
          if (
              `${currentUserFirstName} ${currentUserLastName}`
        !== `${meta.authorFirstName} ${meta.authorLastName}`
          ) {
              this.setState(({ posts }) => ({
                  posts:           posts.map((post) => post.id === likedPost.id ? likedPost : post ),
                  isPostsFetching: false,
              }));
          }
      });
  }

  componentWillUnmount() {
      socket.removeListener('create');
      socket.removeListener('remove');
      socket.removeListener('like');
  }

  _setPostsFetchingState = (state) => {
      this.setState({
          isPostsFetching: state,
      });
  };

  _fetchPosts = async () => {
      this._setPostsFetchingState(true);
      const response = await fetch(api, {
          method: 'GET',
      });
      const { data: posts } = await response.json();

      this.setState({
          posts,
          isPostsFetching: false,
      });
      console.log(posts);
  };

  _createPost = async (comment) => {
      this._setPostsFetchingState(true);
      const response = await fetch(api, {
          method:  'POST',
          headers: {
              'Content-Type': 'application/json',
              Authorization:  TOKEN,
          },
          body: JSON.stringify({ comment }),
      });
      const { data: post } = await response.json();
      this.setState(({ posts }) => ({
          posts:           [ post, ...posts ],
          isPostsFetching: false,
      }));
  };

  _deletePost = async (id) => {
      this._setPostsFetchingState(true);
      await fetch(`${api}/${id}`, {
          method:  'DELETE',
          headers: {
              Authorization: TOKEN,
          },
      });
      this.setState(({ posts }) => ({
          posts:           posts.filter((post) => post.id !== id),
          isPostsFetching: false,
      }));
  };

  _likePost = async (id) => {
      this._setPostsFetchingState(true);
      const response = await fetch(`${api}/${id}`, {
          method:  'PUT',
          headers: {
              Authorization: TOKEN,
          },
      });
      const { data: likedPost } = await response.json();

      this.setState(({ posts }) => ({
          posts:           posts.map((post) => post.id === likedPost.id ? likedPost : post),
          isPostsFetching: false,
      }));
  };

  _animateComposerEnter = (composer) => {
      fromTo(
          composer,
          1,
          { opacity: 0, rotationX: 50 },
          { opacity: 1, rotationX: 0 },
      );
  };

  render() {
      const { posts } = this.state;
      const postsJSX = posts.map((post) => {
          return (
              <Catcher key = { post.id }>
                  <Post
                      key = { post.id }
                      { ...post }
                      _deletePost = { this._deletePost }
                      _likePost = { this._likePost }
                  />
              </Catcher>
          );
      });

      return (
          <section className = { Styles.feed }>
              <Spinner isSpinning = { this.state.isPostsFetching } />
              <StatusBar />
              <Transition
              appear
              in
              timeout = { 1000 }
              onEnter = { this._animateComposerEnter }
              onEntered = { () => console.log('entered') }
              onEntering = { () => console.log('entering') }>
              <Composer _createPost = { this._createPost } />
          </Transition>
              <Postman />
              {postsJSX}
          </section>
      );
  }
}
export default withProfile(Feed);
