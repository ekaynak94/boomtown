import React from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import ItemCard from '../ItemCard';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

const ItemsGrid = ({ classes, items }) => {
  const orderedItems = [...items].sort((a, b) => b.created - a.created);
  return (
    <Grid
      container
      className={classes.grid}
      direction="row"
      alignItems="center"
      justify="center"
      spacing={16}
    >
      {orderedItems.map(item => {
        return (
          <Grid className={classes.card} key={item.id} item>
            <ItemCard item={item} />
          </Grid>
        );
      })}
    </Grid>
  );
};

ItemsGrid.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired
};
export default withStyles(styles)(ItemsGrid);
