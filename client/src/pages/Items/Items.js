import React from 'react';
import ItemsGrid from '../../components/ItemsGrid'

const Items = ({ items, classes }) => {
  return (
    <ItemsGrid items={items} classes={classes}/>
  );
};

export default Items;

