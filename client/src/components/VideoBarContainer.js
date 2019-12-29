import React from 'react';
import VideoBar from './VideoBar';

function VideoBarContainer(props) {
  const videoItemsExist = props.videoItems.length > 0;
  return (
    <div className="videobar-wrapper">
      {
        videoItemsExist ?
          <VideoBar
            onSelect={props.handleSelect}
            videoItems={props.videoItems}
            playbackIndex={props.playbackIndex}
          />
          : null
      }
    </div>
  );
}

export default VideoBarContainer;
