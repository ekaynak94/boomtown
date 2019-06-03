import React from 'react';
import ItemCard from '../ItemCard';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const ShareItemPreview = ({ user, shareItemPreview }) => {
  if (user) {
    shareItemPreview.itemowner = { ...user };
  }
  return <ItemCard item={shareItemPreview} />;
};

const mapStateToProps = ({ shareItemPreview }) => ({ shareItemPreview });

ShareItemPreview.propTypes = {
  user: PropTypes.object.isRequired,
  shareItemPreview: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(ShareItemPreview);
