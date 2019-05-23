import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './Home';
import SearchBar from './SearchBar';
import RestaurantList from './RestaurantList';
import RestaurantDetails from './RestaurantDetails';
import NotFound from './NotFound';

const App = () => {
  const [focus, setFocus] = useState(null);

  const handleOutsideClick = e => {
    if (e.target.nodeName !== 'INPUT') {
      setFocus(null);
    }
  };

  return (
    <div>
      <Router>
        <SearchBar
          focus={focus}
          setFocus={setFocus}
          handleOutsideClick={handleOutsideClick}
        />
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <Home {...props} handleOutsideClick={handleOutsideClick} />
            )}
          />
          <Route
            path="/search/:termID/:locID"
            render={props => (
              <RestaurantList
                {...props}
                handleOutsideClick={handleOutsideClick}
              />
            )}
          />
          <Route
            path="/restaurant/:aliasID/:restaurantID"
            render={props => (
              <RestaurantDetails
                {...props}
                handleOutsideClick={handleOutsideClick}
              />
            )}
          />
          <Route
            render={props => (
              <NotFound {...props} handleOutsideClick={handleOutsideClick} />
            )}
          />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
