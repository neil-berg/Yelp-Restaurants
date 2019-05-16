import React, { useState, useEffect } from 'react';

import yelpapi from '../apis/yelpapi';

const BusinessList = () => {
  const [businesses, setBusinesses] = useState([]);
  const fetchData = async (location, offset = 0) => {
    const response = await yelpapi.get('/businesses/search', {
      params: {
        location: location,
        offset: offset
      }
    });
    setBusinesses(response.data.businesses);
  };

  useEffect(() => {
    fetchData('silver lake los angeles', 20);
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
