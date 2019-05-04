import React from 'react';

import ShareItemForm from '../../components/ShareItemForm';
import ShareItemPreview from '../../components/ShareItemPreview';
import {ViewerContext} from '../../context/ViewerProvider'

const Share = ({ classes, tags }) => (
  <ViewerContext.Consumer>
    {({ viewer, loading }) => {
        return (
          <div>
            <ShareItemPreview user={viewer}/>
            <ShareItemForm tags={tags} />
          </div>
        );
      }
    }
</ViewerContext.Consumer>
)

export default Share;
