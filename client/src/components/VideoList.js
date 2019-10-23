import React from 'react';
import VideoListItem from './VideoListItem';

function VideoList(props) {
  if (!props.videos) return null;
  const videoItems = Object.keys(props.videos).map(i => {
    return (
      <VideoListItem
        key={props.videos[i].id}
        onVideoSelect={props.selectVideo}
        video={props.videos[i]}
        i={i}
        current={props.currentVideo}
        prev={props.prevVideo}
      />
    );
  });
  return (
    <div className="ul-list">
      {videoItems}
    </div>
  );
}

export default VideoList;
