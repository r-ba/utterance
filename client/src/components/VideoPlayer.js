import React, { useEffect } from 'react';
import '../styles/VideoPlayer.css';

function VideoPlayer(props) {
  const { video, caption } = props.playbackIndex;
  const ytid = props.videoItems[video].id;
  const videoProperties = {
    'videoId': ytid,
    'startSeconds': props.videoItems[video].captions[caption],
    'suggestedQuality': 'large'
  };

  const createPlayerEl = () => {
    window.player = new window.YT.Player(`youtube-player`, {
      ...videoProperties,
      events: {
        onReady: event => {
          event.target.playVideo();
          event.target.seekTo(videoProperties.startSeconds);
        }
      }
    });
    window.player.videoId = ytid;
  }

  useEffect(() => {
    // create YouTube player on component mount
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      window.onYouTubeIframeAPIReady = createPlayerEl;
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // YouTube player already exists, so either alter id or timestamp
    } else {

      // same video, so load prev/next caption
      if (window.player.videoId === ytid) {
        window.player.seekTo(videoProperties.startSeconds);

      // load new video
      } else {
        window.player.videoId = ytid;
        window.player.loadVideoById(videoProperties);
      }
    }
  });

  return (
    <div id={`youtube-player`} />
  );
}

export default VideoPlayer;
