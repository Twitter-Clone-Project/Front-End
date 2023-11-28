import * as React from 'react';
// import LandingPage from './landingPage/LandingPage';
import AddPost from './tweetPage/AddPost';
import TimeLine from './tweetPage/TimeLine';

function App() {
  return (
    <div>
      <AddPost />
      <TimeLine user={1234567} />
      {/* <LandingPage /> */}
    </div>
  );
}

export default App;
