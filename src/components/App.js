import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './Home';
import SearchBar from './SearchBar';
import RestaurantList from './RestaurantList';
import RestaurantDetails from './RestaurantDetails';
import NotFound from './NotFound';
import Footer from './Footer';

const App = () => {
  const [inputFood, setInputFood] = useState('');
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
          inputFood={inputFood}
          setInputFood={setInputFood}
          focus={focus}
          setFocus={setFocus}
          handleOutsideClick={handleOutsideClick}
        />
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <Home
                {...props}
                setInputFood={setInputFood}
                handleOutsideClick={handleOutsideClick}
              />
            )}
          />
          <Route
            path="/search/:termID/:locID/:pageID"
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
        <Footer handleOutsideClick={handleOutsideClick} />
      </Router>
    </div>
  );
};

export default App;
