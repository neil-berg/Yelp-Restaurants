import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Loading from './Loading';
import Error from './Error';
import NoResults from './NoResults';
import RestaurantCard from './RestaurantCard';
import AddressMap from './AddressMap';
import Pagination from './Pagination';

import { parseSearchParams } from '../helper';
import yelpapi from '../apis/yelpapi';

const Wrapper = styled.div`
  .leaflet-container {
    width: 325px;
    height: 325px;
    margin: 1rem auto;
    z-index: 1;
  }

  .results {
    .results-list {
      margin: 0 auto;
      padding: 0;
    }
  }

  @media screen and (min-width: 935px) {
    position: relative;

    .leaflet-container {
      margin-left: 1rem;
    }

    .map-sidebar {
      position: ${props => (props.scrollY < '235' ? 'absolute' : 'fixed')};
      top: 0;
      left: 0;
      height: 100%;
      width: 325px;
    }

    .results {
      margin-left: calc(325px + 2rem);
    }
  }
`;

const RestaurantList = ({ match, handleOutsideClick }) => {
  const [term, location, latitude, longitude, page] = parseSearchParams(match);
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => setScrollY(window.scrollY);

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

  useEffect(() => window.addEventListener('scroll', handleScroll), []);

  useEffect(() => {
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (isError) {
    return <Error />;
  }

  if (isLoading) {
    return <Loading />;
  }

  if (restaurants.length === 0) {
    return <NoResults />;
  }

  return (
    <Wrapper scrollY={scrollY} onClick={handleOutsideClick}>
      <div className="map-sidebar">
        <AddressMap restaurants={restaurants} />
      </div>
      <main className="results">
        <ul className="results-list">
          {restaurants.map((restaurant, i) => (
            <li key={restaurant.id}>
              <RestaurantCard index={i} restaurant={restaurant} />
            </li>
          ))}
        </ul>
      </main>
      <Pagination />
    </Wrapper>
  );
};

export default RestaurantList;
