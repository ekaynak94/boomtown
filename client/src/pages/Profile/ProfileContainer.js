
import React, { Component } from 'react';
import Profile from './Profile';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
// import FullScreenLoader from '../../components/FullScreenLoader';
// import { Query } from 'react-apollo';
// import {  } from '../../apollo/queries';

class ProfileContainer extends Component {
  render() {
    console.log(this.props.userid);
      return (
        <Profile />
      );
    }
  }
  
  export default withStyles(styles)(ProfileContainer);