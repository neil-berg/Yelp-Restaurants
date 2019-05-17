import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './Home';
import Header from './Header';
import SearchBar from './SearchBar';
import RestaurantList from './RestaurantList';

class App extends React.Component {
  state = {
    term: '',
    userLocation: '',
    latitude: null,
    longitude: null
  };

  setTerm = term => this.setState({ term });
  setUserLocation = userLocation => this.setState({ userLocation });
  setLatitude = latitude => this.setState({ latitude });
  setLongitude = longitude => this.setState({ longitude });

  render() {
    return (
      <div>
        <Router>
          <Header />
          <SearchBar
            setTerm={this.setTerm}
            setUserLocation={this.setUserLocation}
            setLatitude={this.setLatitude}
            setLongitude={this.setLongitude}
          />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/search/:termID/:locID" component={RestaurantList} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
