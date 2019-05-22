import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './Home';
import SearchBar from './SearchBar';
import RestaurantList from './RestaurantList';
import RestaurantDetails from './RestaurantDetails';
import NotFound from './NotFound';

const App = () => {
  return (
    <div>
      <Router>
        <SearchBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/search/:termID/:locID" component={RestaurantList} />
          <Route
            path="/restaurant/:aliasID/:restaurantID"
            component={RestaurantDetails}
          />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
