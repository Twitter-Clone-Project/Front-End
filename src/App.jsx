import * as React from 'react';
import {
  BrowserRouter,
  Outlet,
  Route,
  Navigate,
  Routes,
} from 'react-router-dom';
import ListNav from './navigation-bars/ListNav';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/home"
          element={<ListNav />}
        />
        <Route
          path="/"
          element={
            <div>
              <ListNav />
              <Outlet />
            </div>
          }
        >
          <Route
            index
            element={<Navigate to="/1" />}
          />
          <Route
            path="1"
            element
          />
          <Route
            path="2"
            element
          />
          <Route
            path="3"
            element
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
