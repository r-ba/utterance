import React from 'react';

function VideoElement(props) {
  if (!props.id) {
    return null;
  }
  const url = `https://www.youtube.com/embed/${props.id}`;
  return (
    <div className="VideoPlayer">
      <iframe
        title="YouTube video"
        width="560"
        height="315"
        src={url}
        frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullscreen>
      </iframe>
    </div>
  );
}

export default VideoElement;
