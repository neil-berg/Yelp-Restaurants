import React, { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: grid;
  grid-template-columns: 5fr 100px;
  grid-template-areas:
    'food search'
    'location search';
  grid-gap: 1rem;
  background: red;
  padding: 1rem;

  .input-food {
    grid-area: food;
    padding: 0.5rem 1rem 0.5rem 50px;
    border-radius: 5px;
  }

  .input-food::placeholder {
    color: green;
  }

  .input-location {
    grid-area: location;
    padding: 0.5rem 1rem;
    border-radius: 5px;
  }

  .btn-search {
    grid-area: search;
    border-radius: 10px;
  }

  .current-location {
    display: ${props => (props.isDropdownOpen ? 'block' : 'none')};
  }
`;

const Input = styled.input`
  width: 400px;
`;

const SearchBar = ({ setPosition, setTerm }) => {
  const [inputFood, setInputFood] = useState('');
  const [inputLocation, setInputLocation] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const locationSuccess = position => {
    setPosition(position.coords);
    setInputLocation('My current location');
  };

  const locationError = err =>
    console.error(`ERROR(${err.code}): ${err.message}`);

  const handleLocationClick = e => {
    setInputLocation('Finding your location...');
    navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
    setIsDropdownOpen(false);
  };

  return (
    <div className="form-container">
      <Form className="form" isDropdownOpen={isDropdownOpen}>
        <input
          className="input-food"
          type="searcg"
          placeholder="What are you in the mood for?"
          value={inputFood}
          onChange={e => setInputFood(e.target.value)}
        />
        <input
          className="input-location"
          type="searcg"
          placeholder="Enter city, neighborhood, or zipcode"
          value={inputLocation}
          onChange={e => setInputLocation(e.target.value)}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        />
        <div className="current-location" onClick={handleLocationClick}>
          <p>Use current location</p>
        </div>
        <button
          className="btn-search"
          type="submit"
          // onClick={e => handleClick(e)}
        >
          Search
        </button>
      </Form>
    </div>
  );
};

export default SearchBar;
