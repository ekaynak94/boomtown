import React from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import ItemCard from '../ItemCard';
import Grid from '@material-ui/core/Grid';

const ItemsGrid = ({ classes, items }) => {
    return (
        <Grid
            container
            className={classes.grid}
            direction="row"
            alignItems="center"
            justify="center"
            spacing={16}
            >
                {items.map((item) => {
                    return (
                        <Grid  className={classes.card} key={item.id} item>
                            <ItemCard item={item}/>
                        </Grid>
                    );
                }
                )}
        </Grid>
    );
}
export default withStyles(styles)(ItemsGrid);