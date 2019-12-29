import React from 'react';
import VideoBarItem from './VideoBarItem';
import '../styles/VideoBar.css';

const computeBounds = (indices, items) => {
  const { video, caption } = indices;
  let maxVideo, maxCaption, isPrevDisabled, isNextDisabled;
  isPrevDisabled = (video === 0) && (caption === 0);
  maxVideo = items.length - 1;
  if (maxVideo >= 0) {
    maxCaption = items[maxVideo].captions.length-1;
    isNextDisabled = (video === maxVideo) && (caption === maxCaption);
  };

  return {
    isPrevDisabled: isPrevDisabled,
    isNextDisabled: isNextDisabled
  };
};

function VideoBar(props) {
  const { video, caption } = props.playbackIndex;
  const {
    isPrevDisabled,
    isNextDisabled
  } = computeBounds(props.playbackIndex, props.videoItems);

  const selectVideo = (videoId, captionId) => {
    const indices = {
      video: videoId,
      caption: captionId
    };
    if (captionId === -1) {
      indices.video -= 1;
      indices.caption = 0;
    } else if (captionId === props.videoItems[videoId].captions.length) {
      indices.video += 1;
      indices.caption = 0;
    }

    props.onSelect({ playbackIndex: indices });
  };

  const videoList = Object.keys(props.videoItems).map(i => {
    const isSelected = (parseInt(i) === props.playbackIndex.video);
    const { id, title, thumbnail } = props.videoItems[i];

    return (
      <VideoBarItem
        key={id}
        i={parseInt(i)}
        title={title}
        thumbnail={thumbnail}
        isSelected={isSelected}
        onSelect={selectVideo}
      />
    );
  });

  return (
    <div className="videobar">
        <button
          className="videobar-button"
          disabled={isPrevDisabled}
          onClick={() => selectVideo(video, caption-1)}
        >
          <img
            className={`videobar-button-icon ${isPrevDisabled ? "hidden" : ""}`}
            src={"./img/caret-left.png"}
            alt="Previous result"
          />
        </button>

      <div className="ul-list">
        {videoList}
      </div>

        <button
          className="videobar-button"
          disabled={isNextDisabled}
          onClick={() => selectVideo(video, caption+1)}
        >
          <img
            className={`videobar-button-icon ${isNextDisabled ? "hidden" : ""}`}
            src={"./img/caret-right.png"}
            alt="Next result"
          />
        </button>
    </div>
  );
}

export default VideoBar;
