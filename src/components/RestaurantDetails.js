import React, { useState, useEffect } from 'react';

import yelpapi from '../apis/yelpapi';

const RestaurantDetails = ({ match }) => {
  const restaurantID = match.params.restaurantID;

  const [details, setDetails] = useState({});
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const response_details = await yelpapi.get(
          `/businesses/${restaurantID}`
        );
        setDetails(response_details.data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchDetails();
  }, [restaurantID]);

  useEffect(() => {
    const fetchReviews = async () => {
      setIsError(false);
      try {
        const response_reviews = await yelpapi.get(
          `/businesses/${restaurantID}/reviews`
        );
        setReviews(response_reviews.data.reviews);
      } catch (error) {
        setIsError(true);
      }
    };
    fetchReviews();
  }, [restaurantID]);

  if (isError) {
    return <div>Error</div>;
  }

  if (isLoading) {
    return <div>Loading!</div>;
  }

  return (
    <div>
      <p>{details.alias}</p>
      <p>{reviews.length}</p>
    </div>
  );
};

export default RestaurantDetails;
