import React from 'react';
import ItemsGrid from '../../components/ItemsGrid';
import UserCard from '../../components/UserCard';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

const Profile = ({ classes, user }) => {
  return (
    <div className={classes.background}>
      <div className={classes.root}>
        <UserCard user={user} />
        <Typography color="primary" variant="headline" component="h1">
          Shared Items
        </Typography>
        <ItemsGrid items={user.items} classes={classes} />
      </div>
    </div>
  );
};

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default Profile;
