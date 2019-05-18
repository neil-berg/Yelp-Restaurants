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
