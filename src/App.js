import React from 'react';
import './styles/App.css';
import Video from './components/VideoEl';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoId: null
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          People utter words
          <Video
            id={this.state.videoId}
          />
        </header>
      </div>
    );
  }
}

export default App;
