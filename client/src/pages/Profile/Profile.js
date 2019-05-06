import React from 'react';
import ItemsGrid from '../../components/ItemsGrid'
const Profile = ({ classes, user }) => {
  return (
    <div>
      <ItemsGrid items={user.items} classes={classes}/>
    </div>
  );
};

export default Profile;
