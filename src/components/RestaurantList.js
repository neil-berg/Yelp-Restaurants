import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Loading from './Loading';
import Error from './Error';
import RestaurantCard from './RestaurantCard';
import AddressMap from './AddressMap';

import { parseSearchParams } from '../helper';
import yelpapi from '../apis/yelpapi';

const Main = styled.main`
  .leaflet-container {
    width: 325px;
    height: 325px;
    margin: 0.5rem auto;
    z-index: 1;
  }
`;

const RestaurantList = ({ match }) => {
  const [term, location, latitude, longitude] = parseSearchParams(match);
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

  if (isError) {
    return <Error />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Main>
      <AddressMap restaurants={restaurants} />
      <ul>
        {restaurants.map(restaurant => (
          <li key={restaurant.id}>
            <RestaurantCard restaurant={restaurant} />
          </li>
        ))}
      </ul>
    </Main>
  );
};

export default RestaurantList;
