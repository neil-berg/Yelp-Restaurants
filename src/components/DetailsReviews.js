import React from 'react';
import styled from 'styled-components';

import { getStars } from '../helper';
import ReviewCard from './ReviewCard';

const ReviewsWrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, 325px);
  grid-gap: 1rem;
  justify-content: center;

  .review-card {
    width: 325px;
    border: 1px lightgrey solid;
    border-radius: 5px;
  }

  .review-card__avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
`;

const DetailsReviews = ({ reviews }) => {
  const renderReviewList = reviews.map((review, i) => (
    <div className="review-card">
      <div className="review-card__user">
        <img
          className="user-avatar"
          src={review.user.image_url}
          alt="Reviewer avatar"
        />
        <div>
          <p className="user-name">{review.user.name}</p>
          <p className="user-date">May 31, 2019</p>
          <img
            className="user-rating"
            src={getStars(review)}
            alt="star rating"
          />
        </div>
      </div>
      <p className="review-card__text">{review.text}</p>
      <a href={review.url} className="reivew-card__link">
        Read full review
      </a>
    </div>
  ));
  return (
    <ReviewsWrapper className="reviews">{renderReviewList}</ReviewsWrapper>
  );
};

export default DetailsReviews;
