import React from 'react';
import { Box } from 'grommet';
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
    <Box
      className="ul-list"
      direction="column"
    >
      {videoItems}
    </Box>
  );
}

export default VideoList;
