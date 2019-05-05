import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import MoreIcon from '@material-ui/icons/MoreVert';

import { NavLink } from 'react-router-dom';

const MenuBar = ({ classes, match }) => {
  return (
      <AppBar position="fixed" color="primary" className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
          <NavLink to='/*'>
            <IconButton className={classes.logo} color="inherit">  
            </IconButton>
          </NavLink>
          <div>
            {match.url!=='/share'?
            <NavLink to='/share'>
                <Button className={classes.addMore} color="inherit">
                    <AddIcon color='secondary'/>
                    <Typography >Share Something</Typography>       
                </Button>
            </NavLink>:null
            }       
            <IconButton color="inherit">
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
  );
}

MenuBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuBar);