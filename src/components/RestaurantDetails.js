import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import DetailsHours from './DetailsHours';
import DetailsOverview from './DetailsOverview';
import DetailsMap from './DetailsMap';
import DetailsReviews from './DetailsReviews';
import Error from './Error';
import Loading from './Loading';
import yelpapi from '../apis/yelpapi';

import yelpLogo from '../assets/yelp-icons/Yelp_trademark_RGB.png';

const DetailsWrapper = styled.div`
  background-color: #f2e8e6;

  .leaflet-container {
    width: 325px;
    height: 325px;
    margin: 1rem auto;
    z-index: 1;
  }
`;

const CoverPhoto = styled.div`
  height: 325px;
  width: auto;
  background-image: linear-gradient(transparent 90%, #f2e8e6 100%), url("${props =>
    props.image_url}");
  background-position: center 50%;
  background-size: cover;
  border-bottom: 1px #f2e8e6 solid;
`;

const RestaurantDetails = ({ match, handleOutsideClick }) => {
  const restaurantID = match.params.restaurantID;

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // Fetch details of this restaurant
  const [details, setDetails] = useState({});
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

  // Fetch 3 reviews from this restaurant
  const [reviews, setReviews] = useState([]);
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
    return <Error />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <DetailsWrapper onClick={handleOutsideClick}>
      <CoverPhoto image_url={details.image_url} />
      <DetailsOverview details={details} />
      <DetailsHours details={details} />
      <DetailsMap details={details} />
      <DetailsReviews reviews={reviews} />
    </DetailsWrapper>
  );
};

export default RestaurantDetails;
