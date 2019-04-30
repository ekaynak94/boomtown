import React from 'react';
import ItemCard from '../ItemCard';
import { connect } from 'react-redux';

const ShareItemPreview = ({shareItemPreview}) => {
  return <ItemCard item={shareItemPreview} />;
  }

const mapStateToProps=({shareItemPreview})=>({shareItemPreview})

export default connect(mapStateToProps)(ShareItemPreview);
