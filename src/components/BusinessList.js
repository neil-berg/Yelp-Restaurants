import React, { useState, useEffect } from 'react';

import yelpapi from '../apis/yelpapi';

const BusinessList = ({ term, userLocation, latitude, longitude }) => {
  const [businesses, setBusinesses] = useState([]);

  const fetchData = async (
    term,
    userLocation,
    latitude,
    longitude,
    offset = 0
  ) => {
    const response = await yelpapi.get('/businesses/search', {
      params: {
        term: term,
        location: userLocation,
        latitude: latitude,
        longitude: longitude,
        offset: offset
      }
    });
    setBusinesses(response.data.businesses);
  };

  useEffect(() => {
    fetchData(term, userLocation, latitude, longitude, 0);
  }, []);

  return (
    <div>
      <ul>
        {businesses.map((item, i) => (
          <li key={i}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default BusinessList;
