import React from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Gravatar from 'react-gravatar';
import PropTypes from 'prop-types';

const UserCard = ({ classes, user }) => {
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Gravatar
            email={user.email ? user.email : 'example@example.com'}
            className={classes.avatar}
          />
        }
        title={user.fullname}
      />
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="headline" component="h2">
          {`${user.items.length} Item shared ${
            user.borrowed.length
          } Item borrowed`}
        </Typography>
        <Typography gutterBottom variant="subheading" component="h3">
          {user.bio ? user.bio : 'No bio provided'}
        </Typography>
      </CardContent>
    </Card>
  );
};

UserCard.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default withStyles(styles)(UserCard);
