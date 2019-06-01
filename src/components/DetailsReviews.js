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
    padding: 1rem;
  }

  .review-card__row1,
  .review-card__row2 {
    display: flex;
    align-items: center;
  }
  .row1-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .row1-name {
    margin-left: 1em;
  }

  .row2-stars {
    width: 100px;
    height: auto;
    margin: 1em 0;
  }

  .row2-date {
    margin-left: 1rem;
  }
`;

const DetailsReviews = ({ reviews }) => {
  const renderReviewList = reviews.map((review, i) => (
    <div className="review-card" key={i}>
      <div className="review-card__row1">
        <img
          className="row1-avatar"
          src={review.user.image_url}
          alt="Reviewer avatar"
        />
        <p className="row1-name">{review.user.name}</p>
      </div>
      <div className="review-card__row2">
        <img className="row2-stars" src={getStars(review)} alt="star rating" />
        <p className="row2-date">June 1, 2019</p>
      </div>
      <div className="review-card__row3">
        <p className="review-card__text">{review.text}</p>
        <a href={review.url} className="reivew-card__link">
          Read full review
        </a>
      </div>
    </div>
  ));
  return (
    <ReviewsWrapper className="reviews">{renderReviewList}</ReviewsWrapper>
  );
};

export default DetailsReviews;
