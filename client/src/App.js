import React from 'react';
import { Route } from 'react-router-dom'
import MovieList from './MovieList';

const App = () => {
  return (
    <>
      <Route
        exact
        path="/"
        component={MovieList}
      />
    </>
  );
}

export default App;
