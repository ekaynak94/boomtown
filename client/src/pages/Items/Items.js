import React from 'react';
import ItemsGrid from '../../components/ItemsGrid';
import PropTypes from 'prop-types';

const Items = ({ items, classes }) => {
  return (
    <div className={classes.background}>
      <ItemsGrid items={items} />
    </div>
  );
};

Items.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired
};

export default Items;
