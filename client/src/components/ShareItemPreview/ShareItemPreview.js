import React from 'react';
import ItemCard from '../ItemCard';
import { connect } from 'react-redux';

const ShareItemPreview = ({ user, shareItemPreview }) => {
  if (user) {
    shareItemPreview.itemowner = { ...user };
  }
  return <ItemCard item={shareItemPreview} />;
};

const mapStateToProps = ({ shareItemPreview }) => ({ shareItemPreview });

export default connect(mapStateToProps)(ShareItemPreview);
