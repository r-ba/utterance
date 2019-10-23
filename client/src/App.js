import React from 'react';
import Search from './components/Search';
import Video from './components/Video';
import VideoList from './components/VideoList';
import { Button, Box } from 'grommet';
import { Add, CaretNext, CaretPrevious } from 'grommet-icons';
import './styles/App.css';
import data from './defaultData.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "joe rogan",
      prevSearch: "joe rogan",
      phrase: "possible",
      prevPhrase: "possible",
      prevVideoId: 0,
      currentVideoId: 0,
      currentVideoTime: 0,
      videoList: data.items,
      videoIds: data.ids,
      pageToken: data.token,
      prevDisabled: true,
      nextDisabled: false,
      prevColour: "#ddd",
      nextColour: "#999",
      cycleMax: 26,
      cycleIndex: 0,
      allowSearches: true
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
    this.setState({[field]: string, prevVideoId: this.state.currentVideoId });
  }

  fetchData = async (token, search, phrase) => {
    let url = `https://utterance-api.herokuapp.com/api/${token}/${search}/${phrase}`;
    return fetch(url).then(results => {
      return results.json();
    });
  }

  handleSubmit = async () => {
    let isNewSearch = (this.state.search !== this.state.prevSearch);
    isNewSearch = (isNewSearch || (this.state.phrase !== this.state.prevPhrase));
    if (this.state.search &&  isNewSearch) {
      this.setState({ allowSearches: false });
      const data = await this.fetchData("new", this.state.search, this.state.phrase);
      let ids = [];
      let cycleMax = 0;
      for (let i in data.items) {
        ids.push(data.items[i].id);
        let matchLength = data.items[i].matches.length;
        cycleMax += matchLength ? matchLength : 1;
      };
      const prevSearch = this.state.search;
      const prevPhrase = this.state.phrase;
      this.setState({
        prevSearch: prevSearch,
        prevPhrase: prevPhrase,
        prevVideoId: 0,
        currentVideoId: 0,
        currentVideoTime: 0,
        videoList: data.items,
        videoIds: data.ids,
        pageToken: data.token,
        prevDisabled: true,
        prevColour: "#ddd",
        cycleMax: cycleMax-1,
        cycleIndex: 0,
        allowSearches: true
      });
      if (cycleMax === 1) this.toggleButton("next", "disable");
      else this.toggleButton("next", "enable");
    }
  }

  handleMore = async () => {
    this.setState({ allowSearches: false });
    let cycleMax = this.state.cycleMax;
    let videoList = this.state.videoList;
    let numVideos = Object.keys(videoList).length;
    const token = this.state.pageToken;
    const search = this.state.prevSearch;
    const phrase = this.state.prevPhrase;
    const data = await this.fetchData(token, search, phrase);
    let ids = this.state.videoIds;
    for (let i in data.items) {
      let id = data.items[i].id;
      if (!ids.includes(id)) {
        let matchLength = data.items[i].matches.length;
        cycleMax += matchLength ? matchLength : 1;
        videoList[numVideos++] = data.items[i];
        ids.push(id);
      };
    };
    this.setState({
      videoList: videoList,
      videoIds: ids,
      pageToken: data.token,
      cycleMax: cycleMax-1,
      allowSearches: true,
      nextColour: "#999",
      nextDisabled: false
    });
  }

  handleCycle(dir) {
    const currentCycleIndex = this.state.cycleIndex;
    const currentVideo = this.state.currentVideoId;
    const currentTime = this.state.currentVideoTime;
    const matchLength = this.state.videoList[currentVideo].matches.length;
    if (dir === "next") {
      if (matchLength-1 > currentTime) {
        this.setState({ currentVideoTime: currentTime+1 });
      } else {
        this.setState({
          currentVideoId: currentVideo+1,
          currentVideoTime: 0
        });
      };
      if (currentCycleIndex+1 === this.state.cycleMax) this.toggleButton("next", "disable");
      this.toggleButton("prev", "enable");
      this.setState({ cycleIndex: currentCycleIndex+1 });
    } else {
      if (currentTime > 0) {
        this.setState({ currentVideoTime: currentTime-1 });
      } else {
        this.setState({
          currentVideoId: currentVideo-1,
          currentVideoTime: this.state.videoList[currentVideo-1].matches.length-1
        });
      };
      if (currentCycleIndex-1 === 0) this.toggleButton("prev", "disable");
      this.toggleButton("next", "enable");
      this.setState({ cycleIndex: currentCycleIndex-1 });
    }
  }

  selectVideo(id) {
    let cycleIndex = 0;
    for (let i in this.state.videoList) {
      if (i < id) {
        let matchLength = this.state.videoList[i].matches.length;
        cycleIndex += matchLength ? matchLength : 1;
      } else {
        break;
      }
    };
    this.setState({
      prevVideoId: parseInt(id),
      currentVideoId: parseInt(id),
      currentVideoTime: 0,
      cycleIndex: cycleIndex
    });
    if (parseInt(id) === 0) {
      this.toggleButton("prev", "disable");
      this.toggleButton("next", "enable");
    } else if (parseInt(id) === Object.keys(this.state.videoList).length-1) {
      this.toggleButton("prev", "enable");
      this.toggleButton("next", "disable");
    } else {
      this.toggleButton("prev", "enable");
      this.toggleButton("next", "enable");
    }
  }

  toggleButton = (button, state) => {
    if (button === "prev") {
      if (state === "disable") {
        this.setState({
          prevColour: "#ddd",
          prevDisabled: true,
        });
      } else {
        this.setState({
          prevColour: "#999",
          prevDisabled: false,
        });
      }
    } else {
      if (state === "disable") {
        this.setState({
          nextColour: "#ddd",
          nextDisabled: true
        });
      } else {
        this.setState({
          nextColour: "#999",
          nextDisabled: false
        });
      }
    }
  };

  render() {
    return (
      <div className="App">
        <Search
          onChange={(field, string) => this.handleSearchBarChange(field, string)}
          onSubmit={() => this.handleSubmit()}
          allow={this.state.allowSearches}
          query={this.state.search}
          phrase={this.state.phrase}
        />
        <Video
          item={this.state.videoList[this.state.currentVideoId]}
          time={this.state.currentVideoTime}
        />
        <Box
          direction="row"
        >
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
          <VideoList
            prevVideo={this.state.prevVideoId}
            currentVideo={this.state.currentVideoId}
            selectVideo={(id) => this.selectVideo(id)}
            videos={this.state.videoList}
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
        {
          this.state.pageToken ?
            <Button
              className="more-button"
              icon={<Add />}
              label="Load More"
              onClick={()=>this.handleMore()}
            />
          : null
        }
      </div>
    );
  }
}

export default App;
