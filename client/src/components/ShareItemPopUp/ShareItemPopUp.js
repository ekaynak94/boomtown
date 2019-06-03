import React from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Cloud from '@material-ui/icons/CloudDone';
import { Link } from 'react-router-dom';

const SharePopUp = ({ classes }) => {
  return (
    <div className={classes.background}>
      <Card className={classes.card}>
        <CardContent>
          <Cloud className={classes.icon} />
          <Typography
            className={classes.title}
            color="secondary"
            gutterBottom
            variant="headline"
            component="h3"
          >
            Your item was added!
          </Typography>
          <Typography className={classes.text}>
            You may add another item if you like. To add another item click 'Add
            another item'. To view your item, click 'Back to items page'.
          </Typography>
        </CardContent>
        <CardActions className={classes.linkContainer}>
          <Link
            onClick={() => window.location.reload()}
            to="/share"
            className={classes.yellowLink}
          >
            Add another item
          </Link>
          <Link to="/items" className={classes.blackLink}>
            Back to items page
          </Link>
        </CardActions>
      </Card>
    </div>
  );
};

SharePopUp.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(SharePopUp);
