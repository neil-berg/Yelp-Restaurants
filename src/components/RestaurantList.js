import React, { useState, useEffect } from 'react';

import { createSearchParams } from '../helper';

import yelpapi from '../apis/yelpapi';

const RestaurantList = ({ match }) => {
  const [term, location, latitude, longitude] = createSearchParams(match);
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
    return <div>ERROR!</div>;
  }

  if (isLoading) {
    return <div>LOADINNGGGGG</div>;
  }

  return (
    <div>
      <ul>
        {restaurants.map((item, i) => (
          <li key={i}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantList;
