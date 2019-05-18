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
        const response_reviews = await yelpapi.get(
          `/businesses/${restaurantID}/reviews`
        );
        setDetails(response_details.data);
        setReviews(response_reviews.data.reviews);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchDetails();
  }, []);

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
