import React from 'react';
import '../styles/LoadMoreButton.css';

function LoadMoreButton(props) {
  return (
    <div className="load-more">
      <button
        className="load-more-button"
        onClick={props.onClick}
        disabled={props.isDisabled}
      >
        Load more results
      </button>
    </div>
  );
}

export default LoadMoreButton;
