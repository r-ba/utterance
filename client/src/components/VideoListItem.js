import React from 'react';

function VideoListItem(props) {
  return (
    <li
      className="li-item"
      key={props.i}
      onClick={event => props.onVideoSelect(props.i)}
    >
      <img
        alt={`YouTube video ${props.video.id}`}
        src={props.video.thumbnail.url}
      />
    </li>
  );
}

export default VideoListItem;
