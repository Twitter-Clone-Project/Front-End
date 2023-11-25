import * as React from 'react';
// import LandingPage from './landingPage/LandingPage';
import TweetList from './tweetPage/tweetList';
import AddPost from './tweetPage/AddPost';

function App() {
  return (
    <div>
      <AddPost />
      <TweetList />
      {/* <LandingPage /> */}
    </div>
  );
}

export default App;
