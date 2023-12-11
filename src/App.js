import React from 'react';
import './App.css';
function App() {
  const yourLiveStreamUrl = 'https://yeslivetv.com/channels/videoland-sports-line2/';

  return (
    <div className="App">
      <header className="App-header">
        <iframe
          title="Your Live Stream"
          width="560"
          height="315"
          src={yourLiveStreamUrl}
          frameBorder="0"
          allowFullScreen
        ></iframe>
        <h1>Welcome to My Live Stream!</h1>
      </header>
    </div>
  );
}

export default App;
