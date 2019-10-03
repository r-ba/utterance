import React from 'react';
import './styles/App.css';
import Video from './components/Video';
import Search from './components/Search';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoId: null,
      searchQuery: null,
      phraseQuery: null
    }
  }

  handleChange(field, string) {
    if (field === "searchQuery") {
      this.setState({
        searchQuery: string
      });
    } else {
      this.setState({
        phraseQuery: string
      });
    }
  }

  handleSubmit() {
    console.log(this.state.searchQuery, this.state.phraseQuery);
    this.setState({
      videoId: this.state.searchQuery
    });
  }

  render() {
    return (
      <div className="App">
        <Search
          onChange={(f,s)=>this.handleChange(f,s)}
          onSubmit={()=>this.handleSubmit()}
        />
        <Video
          id={this.state.videoId}
        />
      </div>
    );
  }
}

export default App;
