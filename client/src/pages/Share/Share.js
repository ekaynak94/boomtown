import React from 'react';
import ShareItemForm from '../../components/ShareItemForm';
import ShareItemPreview from '../../components/ShareItemPreview';
import { ViewerContext } from '../../context/ViewerProvider';
import PropTypes from 'prop-types';

const Share = ({ classes, tags }) => (
  <ViewerContext.Consumer>
    {({ viewer, loading }) => {
      return (
        <div className={classes.Grid}>
          <ShareItemPreview className={classes.GridItem} user={viewer} />
          <ShareItemForm className={classes.GridItem} tags={tags} />
        </div>
      );
    }}
  </ViewerContext.Consumer>
);

Share.propTypes = {
  classes: PropTypes.object.isRequired,
  tags: PropTypes.array.isRequired
};

export default Share;
