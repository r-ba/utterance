import React from 'react';
import VideoPlayer from './VideoPlayer';
import '../styles/VideoPlayer.css';

function VideoPlayerContainer(props) {
  const videoItemsExist = props.videoItems.length > 0;
  return (
    <div className="yt-container">
      {
        videoItemsExist ?
          <VideoPlayer
            videoItems={props.videoItems}
            playbackIndex={props.playbackIndex}
          />
          : <h3>No results found, try loading more.</h3>
      }
    </div>
  );
}

export default VideoPlayerContainer;
