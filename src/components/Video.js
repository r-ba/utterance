import React from 'react';

class Video extends React.PureComponent {
  componentDidUpdate() {
    if (!window.YT) {
      this.spawnYT();
    } else {
      this.player.loadVideoById({'videoId': this.props.id,
                 'startSeconds': 5,
                 'endSeconds': 60,
                 'suggestedQuality': 'large'});
    }
  }

  spawnYT = () => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';

    window.onYouTubeIframeAPIReady = this.loadVideo;

    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  loadVideo = () => {
    const id = this.props.id;

    this.player = new window.YT.Player(`youtube-player-${id}`, {
      videoId: id,
      events: {
        onReady: this.onPlayerReady,
      }
    });
  };

  onPlayerReady = event => {
    event.target.playVideo();
  };

  render() {
    const id = this.props.id;

    if (!id) return null;

    return (
      <div className="yt-container">
        <div id={`youtube-player-${id}`} className="yt-embed" />
      </div>
    );
  }

}

export default Video;
