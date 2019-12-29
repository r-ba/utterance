import React from 'react';

const scrollToRef = (ref) => ref.current.scrollIntoView({behavior: 'smooth'});

function VideoBarItem(props) {
  const liRef = React.useRef(null);
  return (
    <li
      className="li-item"
      ref={liRef}
      onClick={ () => {
        if (!props.isSelected) {
          scrollToRef(liRef);
          props.onSelect(props.i, 0);
        }
      }}
    >
      <img
        className={props.isSelected ? "thumbnail-active" : null}
        alt={props.title}
        src={props.thumbnail}
      />
    </li>
  );
}

export default VideoBarItem;
