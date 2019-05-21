import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faStarHalfAlt,
  faCircle
} from '@fortawesome/free-solid-svg-icons';

// Create URL whenever a valid search form is submitted
// This URL is this used to fetch restaurants in RestaurantList
export const createSearchSlug = (inputFood, inputLocation, lat, lon) => {
  const term = inputFood
    .toLowerCase()
    .replace(/[.,:;?!@#$%^&*()'"]/g, '')
    .replace(/\s/g, '+')
    .split(' ')
    .join('+');
  let loc;
  if (lat && lon) {
    loc = `lat=${lat}&lon=${lon}`;
  } else {
    loc = `loc=${inputLocation
      .toLowerCase()
      .replace(/[.,:;?!@#$%^&*()'"]/g, '')
      .replace(/\s/g, '+')
      .split(' ')
      .join('+')}`;
  }
  return `/search/${term}/${loc}`;
};

// Given a React Router prop of "match", parse necessary search
// parameters for Yelp Fusion calls. Search params include term, location
// latitude, and longitude.
export const parseSearchParams = match => {
  // Parse search term and location or coordinates from URL
  const { termID, locID } = match.params;

  const term = termID;
  let location = null;
  let latitude = null;
  let longitude = null;
  // let offset = 0;

  if (locID.includes('loc=')) {
    location = locID.replace(/loc=/, '');
  } else {
    const [latStr, lonStr] = locID.split('&');
    latitude = latStr.replace(/lat=/, '');
    longitude = lonStr.replace(/lon=/, '');
  }

  return [term, location, latitude, longitude];
};

// Convert disance from meters to miles
export const distanceInMiles = distance =>
  (Number(distance) / 1609.344).toFixed(1);

// Compute center (average) latitude and longitude for an array of restaurants
export const getMapCenter = restaurants => {
  const centerLat =
    restaurants.reduce((acc, curr) => acc + curr.coordinates.latitude, 0) /
    restaurants.length;
  const centerLon =
    restaurants.reduce((acc, curr) => acc + curr.coordinates.longitude, 0) /
    restaurants.length;
  return [centerLat, centerLon];
};

// Create star rating icons
export const getStars = restaurant =>
  [...new Array(5).keys()].map(i => {
    if (i + 1 <= Number(restaurant.rating)) {
      return <FontAwesomeIcon key={i} icon={faStar} color="orange" />;
    } else if ((Number(restaurant.rating) * 10) % 10 === 5) {
      return <FontAwesomeIcon key={i} icon={faStarHalfAlt} color="orange" />;
    } else {
      return <FontAwesomeIcon key={i} icon={faStar} color="lightgrey" />;
    }
  });
