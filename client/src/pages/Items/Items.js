import React from 'react';
import ItemsGrid from '../../components/ItemsGrid'

const Items = ({ items, classes }) => {
  return (
    <div className={classes.background}>
      <ItemsGrid items={items} classes={classes} />
    </div>
    
  );
};

export default Items;

