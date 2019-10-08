import React from 'react';

class Video extends React.PureComponent {
  componentDidMount() {
    this.spawnYT();
  }

  componentDidUpdate() {
    this.spawnYT();
  }

  spawnYT = () => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      window.onYouTubeIframeAPIReady = this.loadVideo;
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } else {
      const startSeconds = this.props.item.matches.length ? this.props.item.matches[0].start : 0;
      this.player.loadVideoById({
        'videoId': this.props.item.id,
        'startSeconds': startSeconds,
        'suggestedQuality': 'large'
       });
    }
  }

  loadVideo = () => {
    const startSeconds = this.props.item.matches.length ? this.props.item.matches[0].start : 0;
    const id = this.props.item.id;
    this.player = new window.YT.Player(`youtube-player-${id}`, {
      videoId: id,
      startSeconds: startSeconds,
      events: {
        onReady: event => event.target.playVideo()
      }
    });
  };

  onPlayerReady = event => {
    event.target.playVideo();
  };

  render() {
    const id = this.props.item.id;
    if (!id) return null;
    return (
      <div className="yt-container">
        <div id={`youtube-player-${id}`} className="yt-embed" />
      </div>
    );
  }

}

export default Video;
