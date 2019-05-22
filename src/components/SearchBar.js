import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import styled from 'styled-components';

import { createSearchSlug } from '../helper';

const Header = styled.header`
  position: relative;
  background: linear-gradient(135deg, #ff4f56, #ff824f);

  .title {
    color: white;
    margin: 0;
    padding: 0;
    text-align: center;
  }

  .search-form {
    display: flex;
    flex-direction: column;
    padding: 1rem;
  }

  .input-food,
  .input-user-location {
    padding: 0.5rem 1rem;
    padding-left: 50px;
    border-radius: 5px;
    margin-bottom: 0.5rem;
    border-radius: 10px;
    border: 1px solid #dddddd;
    font-size: 16px;
  }

  .input-food::placeholder {
    color: black;
  }

  .btn-search {
    border-radius: 10px;
    padding: 0.5rem 1rem;
    width: 200px;
    margin: 0 auto;
  }

  ul.food-list,
  ul.user-location-list {
    list-style-type: none;
    margin: 0;
    padding: 0;
    position: absolute;
    top: 210px;
    left: 0;
    width: 100%;
    background: white;
    z-index: 2;

    li:first-child {
      border-top: 1px lightgrey solid;
    }

    li.food-item,
    li.user-location-item {
      border-bottom: 1px lightgrey solid;
      padding: 0.5rem 1rem;
    }
  }

  .food-list {
    display: ${props => (props.focus === 'input-food' ? 'block' : 'none')};
  }

  .user-location-list {
    display: ${props =>
      props.focus === 'input-user-location' ? 'block' : 'none'};
  }

  @media screen and (min-width: 800px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    .search-form {
      display: flex;
      flex-direction: row;
    }

    .input-food,
    .input-user-location {
      padding: 0;
      margin-bottom: 0;
      min-width: 250px;
    }
  }
`;

const SearchBar = ({ history }) => {
  const [inputFood, setInputFood] = useState('');
  const [inputLocation, setInputLocation] = useState('');
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [focus, setFocus] = useState(null);

  const locationSuccess = position => {
    setLat(position.coords.latitude);
    setLon(position.coords.longitude);
    setInputLocation('Current Location');
  };

  const locationError = err =>
    console.error(`ERROR(${err.code}): ${err.message}`);

  const handleUserLocationClick = e => {
    if (e.target.textContent === 'Current Location') {
      setInputLocation('Finding your location...');
      navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
    } else {
      setInputLocation(e.target.textContent);
    }
  };

  const handleFormSubmit = () => {
    const isValid = inputFood !== '' && inputLocation !== '';
    if (isValid) {
      const searchSlug = createSearchSlug(inputFood, inputLocation, lat, lon);
      // Hide suggestion lists and navigate to the results page
      setFocus(null);
      history.push(searchSlug);
    } else {
      // Display errors
    }
  };

  return (
    <Header focus={focus}>
      <Link to="/">
        <h1 className="title">Chow Now</h1>
      </Link>
      <form className="search-form" onSubmit={e => e.preventDefault()}>
        <input
          className="input-food"
          type="text"
          placeholder="What are you in the mood for?"
          value={inputFood}
          onChange={e => setInputFood(e.target.value)}
          onFocus={e => setFocus(e.target.classList.value)}
        />
        <input
          className="input-user-location"
          type="text"
          placeholder="Enter city, neighborhood, or zipcode"
          value={inputLocation}
          onChange={e => setInputLocation(e.target.value)}
          onFocus={e => setFocus(e.target.classList.value)}
        />
        <button
          className="btn-search"
          type="submit"
          onClick={() => handleFormSubmit()}
        >
          Find Restaurants
        </button>
      </form>
      <ul
        className="food-list"
        onClick={e => {
          setInputFood(e.target.textContent);
          setFocus(null);
        }}
      >
        <li className="food-item">Sushi</li>
        <li className="food-item">Tacos</li>
        <li className="food-item">Pizza</li>
        <li className="food-item">Pasta</li>
        <li className="food-item">Thai</li>
        <li className="food-item">Mediterranean</li>
        <li className="food-item">French</li>
        <li className="food-item">Korean BBQ</li>
        <li className="food-item">Vegan</li>
        <li className="food-item">Waffles</li>
      </ul>
      <ul
        className="user-location-list"
        onClick={e => {
          handleUserLocationClick(e);
          setFocus(null);
        }}
      >
        <li className="user-location-item" style={{ color: 'blue' }}>
          Current Location
        </li>
        <li className="user-location-item">Chicago, IL</li>
        <li className="user-location-item">Los Angeles, CA</li>
        <li className="user-location-item">Miami, FL</li>
        <li className="user-location-item">Nashville, TN</li>
        <li className="user-location-item">Boston, MA</li>
        <li className="user-location-item">Seattle, WA</li>
        <li className="user-location-item">Kansas City, MO</li>
        <li className="user-location-item">Austin, TX</li>
        <li className="user-location-item">Baltimore, MD</li>
      </ul>
    </Header>
  );
};

export default withRouter(SearchBar);
