import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Loading from './Loading';
import Error from './Error';
import RestaurantCard from './RestaurantCard';
import AddressMap from './AddressMap';

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

const RestaurantList = ({ match }) => {
  const [term, location, latitude, longitude] = parseSearchParams(match);
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [scrollY, setScrollY] = useState(0);

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
            longitude: longitude
          }
        });
        setRestaurants(response.data.businesses);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [term, location, latitude, longitude]);

  useEffect(
    () => window.addEventListener('scroll', () => setScrollY(window.scrollY)),
    []
  );

  useEffect(() => {
    return () => {
      window.removeEventLisener('scroll');
    };
  }, []);

  if (isError) {
    return <Error />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Wrapper scrollY={scrollY}>
      <div className="map-sidebar">
        <AddressMap restaurants={restaurants} />
      </div>
      <main className="results">
        <ul className="results-list">
          {restaurants.map(restaurant => (
            <li key={restaurant.id}>
              <RestaurantCard restaurant={restaurant} />
            </li>
          ))}
        </ul>
      </main>
    </Wrapper>
  );
};

export default RestaurantList;
