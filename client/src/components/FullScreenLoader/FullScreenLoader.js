import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

const FullScreenLoader = ({ classes }) => {
  return (
    <div className={classes.root}>
      <CircularProgress className={classes.progress} color="primary" />
      <Typography
        gutterBottom
        variant="headline"
        component="h2"
        color="primary"
      >
        “For it is in giving that we receive.”
      </Typography>
    </div>
  );
};

FullScreenLoader.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FullScreenLoader);
