import React from 'react';
import Search from './components/Search';
import Video from './components/Video';
import VideoList from './components/VideoList';
import { Button, Box } from 'grommet';
import { CaretNext, CaretPrevious } from 'grommet-icons';
import './styles/App.css';
import data from './defaultData.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: null,
      phrase: null,
      currentVideoId: 0,
      currentVideoTime: 0,
      videoList: data.items,
      pageToken: data.token,
      prevDisabled: true,
      nextDisabled: false,
      prevColour: "#ddd",
      nextColour: "#999",
      cycleMax: 3,
      cycleIndex: 0
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      this.handleSubmit();
    }
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
        let cycleMax = 0;
        for (let i in data.items) {
          let matchLength = data.items[i].matches.length;
          cycleMax += matchLength ? matchLength : 1;
        };
        this.setState({
          currentVideoId: 0,
          currentVideoTime: 0,
          videoList: data.items,
          pageToken: data.token,
          prevDisabled: true,
          nextDisabled: false,
          prevColour: "#ddd",
          nextColour: "#999",
          cycleMax: cycleMax-1,
          cycleIndex: 0
        });
      });
    }
  }

  handleCycle(dir) {
    const currentCycleIndex = this.state.cycleIndex;
    const currentVideo = this.state.currentVideoId;
    const currentTime = this.state.currentVideoTime;
    const matchLength = this.state.videoList[currentVideo].matches.length;
    if (dir === "next") {
      if (matchLength-1 > currentTime) {
        this.setState({
          currentVideoTime: currentTime+1
        });
      } else {
        this.setState({
          currentVideoId: currentVideo+1,
          currentVideoTime: 0
        });
      };
      if (currentCycleIndex+1 === this.state.cycleMax) {
        this.setState({
          nextDisabled: true,
          nextColour: "#ddd"
        });
      };
      this.setState({
        prevColour: "#999",
        prevDisabled: false,
        cycleIndex: currentCycleIndex+1
      });
    } else {
      if (currentTime > 0) {
        this.setState({
          currentVideoTime: currentTime-1
        });
      } else {
        this.setState({
          currentVideoId: currentVideo-1,
          currentVideoTime: this.state.videoList[currentVideo-1].matches.length-1
        });
      };
      if (currentCycleIndex-1 === 0) {
        this.setState({
          prevDisabled: true,
          prevColour: "#ddd"
        });
      };
      this.setState({
        nextColour: "#999",
        nextDisabled: false,
        cycleIndex: currentCycleIndex-1
      });
    }
  }

  selectVideo(id) {
    this.setState({
      currentVideoId: id,
      currentVideoTime: 0
    });
  }

  render() {
    return (
      <div className="App">
        <Search
          onChange={(field, string) => this.handleSearchBarChange(field, string)}
          onSubmit={() => this.handleSubmit()}
        />
        <Box direction="row">
          <Button
            disabled={this.state.prevDisabled}
            onClick={() => this.handleCycle("prev")}
          >
            <CaretPrevious
              color={this.state.prevColour}
              size="large"
              className="video-caret"
            />
          </Button>
          <Video
            item={this.state.videoList[this.state.currentVideoId]}
            time={this.state.currentVideoTime}
          />
          <Button
            disabled={this.state.nextDisabled}
            onClick={() => this.handleCycle("next")}
          >
            <CaretNext
              color={this.state.nextColour}
              size="large"
              className="video-caret"
            />
          </Button>
        </Box>
        <VideoList
          selectVideo={(id) => this.selectVideo(id)}
          videos={this.state.videoList}
        />
      </div>
    );
  }
}

export default App;
