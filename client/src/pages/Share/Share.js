import React from 'react';

import ShareItemForm from '../../components/ShareItemForm';
import ShareItemPreview from '../../components/ShareItemPreview';

const Share = ({ classes,tags }) => {
  return (
    <div>
      <ShareItemPreview />
      <ShareItemForm tags={tags}/>
    </div>
  );
};

export default Share;
