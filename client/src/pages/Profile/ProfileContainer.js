import React, { Component } from 'react';
import Profile from './Profile';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import FullScreenLoader from '../../components/FullScreenLoader';
import { Query } from 'react-apollo';
import { ALL_USER_ITEMS_QUERY } from '../../apollo/queries';
import PropTypes from 'prop-types';

class ProfileContainer extends Component {
  render() {
    return (
      <Query query={ALL_USER_ITEMS_QUERY} variables={{ id: this.props.userid }}>
        {({ loading, error, data }) => {
          if (loading) return <FullScreenLoader />;
          if (error) return <p>{`Error! ${error.message}`}</p>;
          if (data)
            return <Profile classes={this.props.classes} user={data.user} />;
        }}
      </Query>
    );
  }
}

ProfileContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  userid: PropTypes.string.isRequired
};

export default withStyles(styles)(ProfileContainer);
