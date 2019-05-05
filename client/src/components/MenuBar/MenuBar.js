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
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { NavLink } from 'react-router-dom';
import { LOGOUT_MUTATION } from '../../apollo/queries';
import { Mutation } from "react-apollo";

class MenuBar extends React.Component {
    constructor(props) {
        super(props);
        const { classes, match } = props;
        this.state = {
            classes,
            anchorEl: null,
        };
    }
    
    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
  
    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    logOut = (logout) => {
        window.location.reload();
        logout();
    };
  
    render() {
        const { match } = this.props;
        const { anchorEl } = this.state;
        return (
            <Mutation mutation={LOGOUT_MUTATION}>
                {(logout) => (
                    <AppBar position="fixed" color="primary" className={this.state.classes.appBar}>
                        <Toolbar className={this.state.classes.toolbar}>
                            <NavLink to='/*'>
                                <IconButton className={this.state.classes.logo} color="inherit">
                                </IconButton>
                            </NavLink>
                            <div>
                                {match.url !== '/share' ?
                                    <NavLink to='/share'>
                                        <Button className={this.state.classes.addMore} color="inherit">
                                            <AddIcon color='secondary' />
                                            <Typography >Share Something</Typography>
                                        </Button>
                                    </NavLink> : null
                                }
                                <IconButton
                                    aria-owns={anchorEl ? 'nav-menu' : undefined}
                                    aria-haspopup="true"
                                    onClick={this.handleClick}
                                    color="inherit">
                                    <MoreIcon />
                                </IconButton>
                                <Menu
                                    id="nav-menu"
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={this.handleClose}
                                >
                                    <MenuItem onClick={this.handleClose}>
                                        <NavLink to='/profile'>
                                            Your Profile
                                        </NavLink>
                                    </MenuItem>
                                    <MenuItem onClick={()=>this.logOut(logout)}>
                                        <NavLink to='/*'>
                                            Sign-Out
                                        </NavLink>
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
};

export default withStyles(styles)(MenuBar);