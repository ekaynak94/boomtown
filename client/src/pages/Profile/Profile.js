import React from 'react';
import ItemsGrid from '../../components/ItemsGrid';
import UserCard from '../../components/UserCard';
import Typography from '@material-ui/core/Typography';

const Profile = ({ classes, user }) => {
  return (
    <div>
      <UserCard user={user} />
      <Typography color="primary" variant="headline" component="h1">
        Shared Items
      </Typography>
      <ItemsGrid items={user.items} classes={classes}/>
    </div>
  );
};

export default Profile;
