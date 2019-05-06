import React from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';

const UserCard = ({ classes,user}) => {
    return (
        <div>This is a usercard</div>
    );
}

export default withStyles(styles)(UserCard);