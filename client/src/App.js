import React from 'react';
import Search from './components/Search';
import Video from './components/Video';
import VideoList from './components/VideoList';
import './styles/App.css';
import data from './defaultData.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: null,
      phrase: null,
      currentVideoId: 0,
      videoList: data.items,
      pageToken: data.token
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleSearchBarChange(field, string) {
    this.setState({[field]: string});
  }

  handleSubmit = () => {
    if (this.state.search) {
      let url = `https://utterance-api.herokuapp.com/api/${this.state.search}/`;
      if (this.state.phrase) url += this.state.phrase;
      fetch(url).then(results => {
        return results.json();
      }).then(data => {
        this.setState({
          videoList: data.items,
          pageToken: data.token
        });
      });
    }
  }

  handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      this.handleSubmit();
    }
  }

  selectVideo(id) {
    this.setState({
      currentVideoId: id
    });
  }

  render() {
    return (
      <div className="App">
        <Search
          onChange={(field, string) => this.handleSearchBarChange(field, string)}
          onSubmit={() => this.handleSubmit()}
        />
        <Video
          item={this.state.videoList[this.state.currentVideoId]}
        />
        <VideoList
          selectVideo={(id) => this.selectVideo(id)}
          videos={this.state.videoList}
        />
      </div>
    );
  }
}

export default App;
