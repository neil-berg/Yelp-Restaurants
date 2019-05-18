import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Loading from './Loading';
import Error from './Error';
import { parseSearchParams } from '../helper';
import yelpapi from '../apis/yelpapi';

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
    <div>
      <ul>
        {restaurants.map((item, i) => (
          <li key={item.id}>
            <Link to={`/restaurant/${item.alias}/${item.id}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantList;
