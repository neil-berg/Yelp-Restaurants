import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';

import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUtensils,
  faMapMarkerAlt,
  faSearch,
  faLocationArrow
} from '@fortawesome/free-solid-svg-icons';

import { createSearchSlug } from '../helper';

const Header = styled.header`
  position: relative;
  background: linear-gradient(135deg, var(--red), var(--orange));

  .title {
    color: white;
    margin: 0;
    padding: 0.5rem 0 0 0;
    text-align: center;
  }

  .search-form {
    display: flex;
    flex-direction: column;
    padding: 1rem;
  }

  .input-food-container,
  .input-user-location-container {
    position: relative;
    width: 100%;
  }

  .icon-utensils,
  .icon-marker {
    position: absolute;
    top: 7px;
    left: 10px;
    font-size: 20px;
    color: black;
  }

  .input-food,
  .input-user-location {
    padding: 0.5rem 1rem 0.5rem 35px;
    border-radius: 5px;
    margin-bottom: 0.5rem;
    border-radius: 10px;
    border: 1px solid #dddddd;
    font-size: 16px;
    width: 100%;
  }

  .btn-search {
    border-radius: 10px;
    padding: 0.5rem 1rem;
    margin: 0 auto;
    color: white;
    background: ${props => (props.isLoadingLocation ? 'grey' : 'var(--red)')};
    border: 1px lightgrey solid;
    width: 100%;
    transition: background 0.2s ease-in-out;
  }

  .btn-search:active {
    background: var(--lightred);
  }

  .btn-search-icon {
    margin-right: 1rem;
  }

  ul.food-list,
  ul.user-location-list {
    list-style-type: none;
    margin: 0;
    padding: 0;
    position: absolute;
    top: 138px;
    width: 100%;
    background: white;
    z-index: 2;
    cursor: pointer;
    border-bottom: 1px lightgrey solid;

    li:first-child {
      border-top: 1px lightgrey solid;
    }

    li.food-item,
    li.user-location-item {
      //border-bottom: 1px lightgrey solid;
      padding: 0.5rem 1rem;
    }

    .icon-arrow {
      color: blue;
    }

    .current-location {
      color: blue;
      padding-left: 0.5rem;
    }
  }

  ul.user-location-list {
    top: 94px;
  }

  .food-list {
    display: ${props => (props.focus === 'input-food' ? 'block' : 'none')};
  }

  .user-location-list {
    display: ${props =>
      props.focus === 'input-user-location' ? 'block' : 'none'};
  }

  @media screen and (min-width: 901px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    .title {
      padding: 0;
    }

    .search-form {
      display: flex;
      flex-direction: row;
    }

    .input-food,
    .input-user-location {
      margin-bottom: 0;
      min-width: 315px;
      border: transparent;
    }

    .input-food {
      border-radius: 5px 0 0 5px;
    }
    .input-user-location {
      border-radius: 0;
      border-right: 0;
      border-left: 1px lightgrey solid;
    }

    .btn-search {
      width: auto;
      border-radius: 0 5px 5px 0;
      border: 0;
      color: white;
    }

    .btn-search-icon {
      margin: 0;
    }

    .btn-search-text {
      display: none;
    }

    ul.food-list,
    ul.user-location-list {
      top: 34px;
      width: 315px;
      border-left: 1px lightgrey solid;
      border-right: 1px lightgrey solid;
    }
  }

  @media (hover: hover) {
    ul.food-list li:hover,
    ul.user-location-list li:hover {
      background: linear-gradient(135deg, var(--red), var(--orange));
      color: white;

      .icon-arrow,
      .current-location {
        color: white;
      }
    }

    .btn-search:hover {
      background: var(--darkred);
    }

    .btn-search:active {
      background: var(--lightred);
    }
  }
`;

const SearchBar = ({
  history,
  inputFood,
  setInputFood,
  focus,
  setFocus,
  handleOutsideClick
}) => {
  const [inputLocation, setInputLocation] = useState('');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);

  const springProps = useSpring({
    to: { opacity: 1, transform: `scale(1)` },
    from: { opacity: 0, transform: `scale(0.75)` },
    config: { duration: 250 }
  });

  const locationSuccess = position => {
    setLat(position.coords.latitude);
    setLon(position.coords.longitude);
    setInputLocation('Current Location');
    setIsLoadingLocation(false);
  };

  const locationError = err => {
    console.error(`ERROR(${err.code}): ${err.message}`);
    setIsLoadingLocation(false);
  };

  const handleUserLocationClick = e => {
    const text = e.target.textContent;
    if (text === 'Current Location' || text === '') {
      setIsLoadingLocation(true);
      setInputLocation('Finding your location...');
      navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
    } else {
      setInputLocation(text);
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
    <Header
      isLoadingLocation={isLoadingLocation}
      focus={focus}
      onClick={handleOutsideClick}
    >
      <Link to="/">
        <animated.h1 style={springProps} className="title">
          Chow Now
        </animated.h1>
      </Link>
      <form className="search-form" onSubmit={e => e.preventDefault()}>
        <div className="input-food-container">
          <FontAwesomeIcon className="icon-utensils" icon={faUtensils} />
          <input
            className="input-food"
            type="text"
            placeholder="What are you in the mood for?"
            value={inputFood}
            onChange={e => setInputFood(e.target.value)}
            onFocus={e => setFocus(e.target.classList.value)}
          />
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
        </div>
        <div className="input-user-location-container">
          <FontAwesomeIcon className="icon-marker" icon={faMapMarkerAlt} />
          <input
            className="input-user-location"
            type="text"
            placeholder="City, neighborhood, zipcode, etc."
            value={inputLocation}
            onChange={e => setInputLocation(e.target.value)}
            onFocus={e => setFocus(e.target.classList.value)}
          />
          <ul
            className="user-location-list"
            onClick={e => {
              handleUserLocationClick(e);
              setFocus(null);
            }}
          >
            <li className="user-location-item">
              <FontAwesomeIcon className="icon-arrow" icon={faLocationArrow} />
              <span className="current-location">Current Location</span>
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
        </div>
        <button
          className="btn-search"
          type="submit"
          disabled={isLoadingLocation}
          onClick={() => handleFormSubmit()}
          onFocus={() => setFocus(null)}
        >
          <FontAwesomeIcon className="btn-search-icon" icon={faSearch} />
          <span className="btn-search-text">Search</span>
        </button>
      </form>
    </Header>
  );
};

export default withRouter(SearchBar);
