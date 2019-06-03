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
import AccountCircle from '@material-ui/icons/AccountCircle';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import MoreIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import { LOGOUT_MUTATION } from '../../apollo/queries';
import { Mutation } from 'react-apollo';

class MenuBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    };
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  logOut = logout => {
    window.location.reload();
    logout();
  };

  render() {
    const { match, classes } = this.props;
    const { anchorEl } = this.state;
    return (
      <Mutation mutation={LOGOUT_MUTATION}>
        {logout => (
          <AppBar position="fixed" color="primary" className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
              <Link to="/*">
                <IconButton className={classes.logo} color="inherit" />
              </Link>
              <div>
                {match.url !== '/share' ? (
                  <Link to="/share">
                    <Button className={classes.share} color="inherit">
                      <AddIcon color="secondary" />
                      <Typography>Share Something</Typography>
                    </Button>
                  </Link>
                ) : null}
                <IconButton
                  aria-owns={anchorEl ? 'nav-menu' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleClick}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
                <Menu
                  id="nav-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>
                    <Link className={classes.link} to="/profile">
                      <AccountCircle
                        className={classes.icon}
                        color="secondary"
                      />Your Profile
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={() => this.logOut(logout)}>
                    <Link className={classes.link} to="/*">
                      <PowerSettingsNew
                        className={classes.icon}
                        color="secondary"
                      />Sign-Out
                    </Link>
                  </MenuItem>
                </Menu>
              </div>
            </Toolbar>
          </AppBar>
        )}
      </Mutation>
    );
  }
}

MenuBar.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default withStyles(styles)(MenuBar);
