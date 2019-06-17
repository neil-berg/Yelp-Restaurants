import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Loading from './Loading';
import Error from './Error';
import NoResults from './NoResults';
import RestaurantCard from './RestaurantCard';
import AddressMap from './AddressMap';
import Pagination from './Pagination';

import { parseSearchParams } from '../helper';
import yelpapi from '../apis/yelpapi';

const ResultsWrapper = styled.section`
  .leaflet-container {
    width: 325px;
    height: 325px;
    margin: 1rem auto;
    z-index: 1;
  }

  .results__list {
    margin: 0;
    padding: 0;
  }

  @media screen and (min-width: 935px) {
    position: relative;

    .leaflet-container {
      margin-left: 1rem;
    }

    .map-container {
      position: ${props => (props.scrollY < '235' ? 'absolute' : 'fixed')};
      top: 0;
      left: 0;
      height: 100%;
      width: 350px;
    }

    .results {
      margin-left: calc(325px + 1rem);
    }
  }
`;

const RestaurantList = ({ match, handleOutsideClick }) => {
  // Sync URL and UI through URL parameters
  const [term, location, latitude, longitude, page] = parseSearchParams(match);

  // State and effects for fetching the searched restaurants
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const response = await yelpapi.get('/businesses/search', {
          params: {
            term: term,
            location: location,
            latitude: latitude,
            longitude: longitude,
            offset: `${page * 20}`
          }
        });
        setRestaurants(response.data.businesses);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [term, location, latitude, longitude, page]);

  // State and effects for tracking vertical scroll
  // to control positioning of the address map
  const [scrollY, setScrollY] = useState(0);
  const handleScroll = () => setScrollY(window.scrollY);

  useEffect(() => window.addEventListener('scroll', handleScroll), []);

  useEffect(() => {
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Ensure we start at the top of the page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  if (isError) {
    return (
      <Error text="Hm, there is an issue with this search. Try another one!" />
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  if (!isLoading && restaurants.length === 0) {
    return <NoResults />;
  }

  return (
    <ResultsWrapper
      data-testid="restaurant-wrapper"
      scrollY={scrollY}
      onClick={handleOutsideClick}
    >
      <div className="map-container">
        <AddressMap restaurants={restaurants} />
      </div>
      <section className="results">
        <ul className="results__list">
          {restaurants.map((restaurant, i) => (
            <li
              data-testid="restaurant-list-item"
              key={restaurant.id}
              className="results__item"
            >
              <RestaurantCard
                className="results__card"
                index={i}
                restaurant={restaurant}
              />
            </li>
          ))}
        </ul>
      </section>
      <Pagination />
    </ResultsWrapper>
  );
};

RestaurantList.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool.isRequired,
    params: PropTypes.shape({
      locID: PropTypes.string.isRequired,
      pageID: PropTypes.string.isRequired,
      termID: PropTypes.string.isRequired
    }),
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }),
  handleOutsideClick: PropTypes.func.isRequired
};

export default RestaurantList;
