import React, { useState, useEffect } from 'react';

import { createSearchParams } from '../helper';

import yelpapi from '../apis/yelpapi';

const RestaurantList = ({ match }) => {
  //const searchParams = createSearchParams(match);

  // Parse search term and location or coordinates from URL
  // const { termID, locID } = match.params;
  // const term = termID;

  // let location;
  // let latitude;
  // let longitude;

  // if (locID.includes('loc=')) {
  //   location = locID.replace(/loc=/, '');
  // } else {
  //   const [latStr, lonStr] = locID.split('&');
  //   latitude = latStr.replace(/lat=/, '');
  //   longitude = lonStr.replace(/lon=/, '');
  // }
  const [term, location, latitude, longitude] = createSearchParams(match);
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await yelpapi.get('/businesses/search', {
        params: {
          term: term,
          location: location,
          latitude: latitude,
          longitude: longitude
        }
      });
      setRestaurants(response.data.businesses);
      setIsLoading(false);
    };
    fetchData();
  }, [term, location, latitude, longitude]);

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
