import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './Header';
import SearchBar from './SearchBar';
import Home from './Home';
import BusinessList from './BusinessList';

import { usePosition } from '../hooks/usePosition';

class App extends React.Component {
  state = {
    position: {},
    term: ''
  };

  setPosition = position => this.setState({ position });

  setTerm = term => this.setState({ term });

  render() {
    return (
      <div>
        <Header />
        <p>{this.state.position.latitude}</p>
        <p>{this.state.position.longitude}</p>
        <SearchBar setPosition={this.setPosition} setTerm={this.setTerm} />
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/results" component={BusinessList} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
