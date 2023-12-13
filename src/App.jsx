import * as React from 'react';
import LandingPage from './landingPage/LandingPage';
import SearchBar from './components/search-bar/SearchBar';

function App() {
  const [value, setValue] = React.useState('');
  return (
    <div>
      {/* <LandingPage /> */}
      <SearchBar
        value={value}
        setValue={setValue}
      />
    </div>
  );
}

export default App;
