import React from 'react';

const scrollToRef = (ref) => ref.current.scrollIntoView({behavior: 'smooth'});

function VideoListItem(props) {
  const liRef = React.useRef(null);
  const prev = props.prev;
  const curr = props.current;
  const i = parseInt(props.i);
  let thumbnailClass = (curr === i) ? "thumbnail-active" : "";
  if (liRef.current && (curr === i) && (prev !== i)) scrollToRef(liRef);
  return (
    <li
      ref={liRef}
      className="li-item"
      key={props.i}
      onClick={event => {
        scrollToRef(liRef);
        props.onVideoSelect(props.i);
      }}
    >
      <img
        className={thumbnailClass}
        alt={`YouTube video ${props.video.id}`}
        src={props.video.thumbnail.url}
      />
    </li>
  );
}

export default VideoListItem;
