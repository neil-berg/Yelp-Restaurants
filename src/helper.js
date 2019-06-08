import zeroStars from './assets/yelp-icons/regular_0@3x.png';
import oneStars from './assets/yelp-icons/regular_1@3x.png';
import oneHalfStars from './assets/yelp-icons/regular_1_half@3x.png';
import twoStars from './assets/yelp-icons/regular_3@3x.png';
import twoHalfStars from './assets/yelp-icons/regular_2_half@3x.png';
import threeStars from './assets/yelp-icons/regular_3@3x.png';
import threeHalfStars from './assets/yelp-icons/regular_3_half@3x.png';
import fourStars from './assets/yelp-icons/regular_4@3x.png';
import fourHalfStars from './assets/yelp-icons/regular_4_half@3x.png';
import fiveStars from './assets/yelp-icons/regular_5@3x.png';
import moment from 'moment';

// Create URL whenever a valid search form is submitted
// This URL is this used to fetch restaurants in RestaurantList
// Default 1st page of results
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
  return `/search/${term}/${loc}/page=1`;
};

// Given a React Router prop of "match", parse necessary search
// parameters for Yelp Fusion calls. Search params include term, location
// latitude, longitude, and offset (by page number)
export const parseSearchParams = match => {
  // Parse search term and location or coordinates from URL
  const { termID, locID, pageID } = match.params;
  const term = termID;
  const page = pageID.replace(/page=/, '');

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

  return [term, location, latitude, longitude, page];
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

export const getStars = restaurant => {
  const ratingToStars = {
    '0': zeroStars,
    '1': oneStars,
    '1.5': oneHalfStars,
    '2': twoStars,
    '2.5': twoHalfStars,
    '3': threeStars,
    '3.5': threeHalfStars,
    '4': fourStars,
    '4.5': fourHalfStars,
    '5': fiveStars
  };

  return ratingToStars[restaurant.rating];
};

// Format open hours to produce an object with weekdays as
// keys and values as an array storing all open/close times per day
export const getOpenHours = openHours => {
  let formattedHours = {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: []
  };

  const idxToDay = {
    0: 'Monday',
    1: 'Tuesday',
    2: 'Wednesday',
    3: 'Thursday',
    4: 'Friday',
    5: 'Saturday',
    6: 'Sunday'
  };

  const formatTime = time => {
    const hours = Number(time.slice(0, 2));
    const mins = time.slice(2, 4);
    if (hours === 0) {
      return '12:00AM';
    } else if (hours > 12) {
      return `${hours - 12}:${mins}PM`;
    } else {
      return `${hours}:${mins}AM`;
    }
  };

  try {
    openHours.forEach(item => {
      const day = idxToDay[item.day];
      const start = formatTime(item.start);
      const end = formatTime(item.end);
      formattedHours[day].push(`${start} - ${end}`);
    });
  } catch (err) {
    return null;
  }
  return formattedHours;
};

// Format date of reviews into Month, Day Year
// Input format: "2019-05-26 18:54:30"
export const formatReviewDate = date =>
  moment(date, 'YYYY-MM-DD HH:mm:ss').format('MMM D, YYYY');
