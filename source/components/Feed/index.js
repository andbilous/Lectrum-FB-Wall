import React , {Component} from 'react';

import Composer from './../Composer/index';
import Post from '../Post/index';
import StatusBar from '../StatusBar/index';


import Styles from './styles.m.css';

export default class Feed extends Component {
  render(){
    const {avatar,
       currentUserFirstName,
       currentUserLastName} 
       =this.props;
    return (
        <section className={Styles.feed}>
              <StatusBar />
             <Composer  />
             <Post />
      </section>
    )
  }
}