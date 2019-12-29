import React from 'react';

import SearchBar from './components/SearchBar';
import VideoPlayerContainer from './components/VideoPlayerContainer';
import VideoBarContainer from './components/VideoBarContainer';
import LoadMoreButton from './components/LoadMoreButton';

import defaultData from './data/defaultData';
import { fetchData, parseData, mergeData } from './data/transformData';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...defaultData,
      playbackIndex: {
        video: 0,
        caption: 0
      },
      loadingSearch: false
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleLoadMore = this.handleLoadMore.bind(this);
  }

  handleSelect(playbackIndex) {
    this.setState(playbackIndex)
  }

  handleSearch = async (query) => {
    const { searchTerm, searchPhrase } = query;

    // block further searches until existing one completes
    this.setState({
      loadingSearch: true
    });

    // preform new search only if query has changed
    if (searchTerm !== this.state.searchTerm || searchPhrase !== this.state.searchPhrase) {

      const search = await fetchData(query);
      this.setState({
        ...query,
        searchToken: search.token,
        videoItems: parseData(search.items),
        playbackIndex: {
          video: 0,
          caption: 0
        },
        loadingSearch: false
      });
    }
  }

  handleLoadMore = async () => {
    // block further searches until existing one completes
    this.setState({
      loadingSearch: true
    });

    // search next page of results
    const search = await fetchData({
      searchTerm: this.state.searchTerm,
      searchPhrase: this.state.searchPhrase,
      searchToken: this.state.searchToken
    });
    this.setState({
      searchToken: search.token,
      videoItems: mergeData(this.state.videoItems, search.items),
      loadingSearch: false
    });
  }

  render() {
    return (
      <React.Fragment>
        <SearchBar
          searchTerm={this.state.searchTerm}
          searchPhrase={this.state.searchPhrase}
          onSubmit={this.handleSearch}
          isDisabled={this.state.loadingSearch}
        />
        <VideoPlayerContainer
          videoItems={this.state.videoItems}
          playbackIndex={this.state.playbackIndex}
        />
        <VideoBarContainer
          onSelect={this.handleSelect}
          videoItems={this.state.videoItems}
          playbackIndex={this.state.playbackIndex}
        />
        <LoadMoreButton
          onClick={this.handleLoadMore}
          isDisabled={this.state.loadingSearch}
        />
      </React.Fragment>
    );
  }
}

export default App;
