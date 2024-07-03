import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';


export const App = () => (
  <Router>
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        ></Route>
        <Route
          path="/login"
          element={<LoginPage />}
        ></Route>
      </Routes>
    </div>
  </Router>
  // <h1>Hello World</h1>
);
