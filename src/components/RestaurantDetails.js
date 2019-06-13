import React, { useState, useEffect } from 'react';

import Error from './Error';
import Loading from './Loading';
import RestaurantHours from './RestaurantHours';
import RestaurantReviews from './RestaurantReviews';
import yelpapi from '../apis/yelpapi';

const RestaurantDetails = ({ showDetails, restaurantID }) => {
  // Fetch hours and user reviews
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [hours, setHours] = useState({});
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchHoursAndReviews = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const responseHours = await yelpapi.get(`/businesses/${restaurantID}`);
        const responseReviews = await yelpapi.get(
          `/businesses/${restaurantID}/reviews`
        );
        setHours(responseHours.data.hours[0]);
        setReviews(responseReviews.data.reviews);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    if (
      showDetails &&
      Object.keys(hours).length === 0 &&
      reviews.length === 0
    ) {
      fetchHoursAndReviews();
    }
  }, [restaurantID, showDetails, hours, reviews.length]);

  if (isError) {
    return <Error text="Error loading restaurant details" />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <RestaurantHours hours={hours} />
      <RestaurantReviews reviews={reviews} />
    </>
  );
};

export default RestaurantDetails;
