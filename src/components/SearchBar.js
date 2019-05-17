import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

const FormContainer = styled.div`
  position: relative;

  .search-form {
    display: flex;
    flex-direction: column;
    background: mistyrose;
    padding: 1rem;
  }

  .input-food,
  .input-user-location {
    padding: 0.5rem 1rem;
    padding-left: 50px;
    border-radius: 5px;
    margin-bottom: 0.5rem;
    border-radius: 10px;
    // outline: none;
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
    top: 156px;
    left: 0;
    width: 100%;

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
`;

const SearchBar = ({
  setTerm,
  setUserLocation,
  setLatitude,
  setLongitude,
  history
}) => {
  const [inputFood, setInputFood] = useState('');
  const [inputLocation, setInputLocation] = useState('');
  const [focus, setFocus] = useState(null);
  const [isFormValid, setFormValid] = useState(false);

  const locationSuccess = position => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
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

  const handleSearchClick = () => {
    const isValid = inputFood !== '' && inputLocation !== '';
    setFormValid(isValid);
    setTerm(inputFood);
    setUserLocation(inputLocation);
    if ({ isFormValid }) {
      // Hide suggestion lists and navigate to the results page
      setFocus(null);
      history.push('/restaurants');
    }
  };

  return (
    <FormContainer focus={focus} onSubmit={e => e.preventDefault()}>
      <form className="search-form">
        <input
          className="input-food"
          type="search"
          placeholder="What are you in the mood for?"
          value={inputFood}
          onChange={e => setInputFood(e.target.value)}
          onFocus={e => setFocus(e.target.classList.value)}
        />
        <input
          className="input-user-location"
          type="search"
          placeholder="Enter city, neighborhood, or zipcode"
          value={inputLocation}
          onChange={e => setInputLocation(e.target.value)}
          onFocus={e => setFocus(e.target.classList.value)}
        />
        <button
          className="btn-search"
          type="submit"
          onClick={() => handleSearchClick()}
        >
          Find Restaurants
        </button>
      </form>
      <ul
        className="food-list"
        onClick={e => setInputFood(e.target.textContent)}
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
        onClick={e => handleUserLocationClick(e)}
      >
        <li className="user-location-item" style={{ color: 'blue' }}>
          Current Location
        </li>
        <li className="user-location-item">Chicago, IL</li>
        <li className="user-location-item">Washington, DC</li>
        <li className="user-location-item">Miami, FL</li>
        <li className="user-location-item">Nashville, TN</li>
        <li className="user-location-item">Boston, MA</li>
        <li className="user-location-item">Seattle, WA</li>
        <li className="user-location-item">Kansas City, MO</li>
        <li className="user-location-item">Austin, TX</li>
        <li className="user-location-item">Baltimore, MD</li>
      </ul>
    </FormContainer>
  );
};

export default withRouter(SearchBar);
