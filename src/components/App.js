import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './Header';
import SearchBar from './SearchBar';
import Home from './Home';
import BusinessList from './BusinessList';

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
            <Route
              path="/restaurants"
              component={props => (
                <BusinessList
                  {...props}
                  term={this.state.term}
                  userLocation={this.state.userLocation}
                  latitude={this.state.latitude}
                  longitude={this.state.longitude}
                />
              )}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
