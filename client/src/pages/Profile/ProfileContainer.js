
import React, { Component } from 'react';
import Profile from './Profile';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
// import FullScreenLoader from '../../components/FullScreenLoader';
import { Query } from 'react-apollo';
import { ALL_USER_ITEMS_QUERY } from '../../apollo/queries';

class ProfileContainer extends Component {
  render() {
      return (
        <Query query={ALL_USER_ITEMS_QUERY} variables={{ id:this.props.userid }}>
            {({ loading, error, data }) => {
                if (loading) return <p>Loading</p>;
                if (error) return <p>{`Error! ${error.message}`}</p>;
                if(data) return <Profile user={data.user}/>;
            }}
        </Query>
      );
    }
  }
  
  export default withStyles(styles)(ProfileContainer);