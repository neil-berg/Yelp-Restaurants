import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { getStars, formatReviewDate } from '../helper';

const ReviewsWrapper = styled.section`
  // margin-bottom: ${props => (props.showDetails ? '1rem' : '0')};

  margin-bottom: 1rem;

  .review-card {
    width: 100%;
    border-top: 1px lightgrey solid;
    padding: 1rem;
  }

  .review-card__header {
    display: flex;
    align-items: center;
  }

  .review-card__header-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  .review-card__header-name {
    margin: 0 0 0.25em 1em;
    font-size: 0.9em;
  }

  .review-card__header-stars-date {
    display: flex;
    align-items: center;
    margin-left: 1rem;
  }

  .review-card__header-stars {
    width: 100px;
    height: auto;
    margin: 0;
  }

  .review-card__header-date {
    font-size: 0.9em;
    margin: 0 0 0 1rem;
    color: grey;
  }

  .review-card__text {
    font-size: 0.9em;
    margin: 0;
    padding: 0.5rem 0 0 0;
  }

  .review-card__link {
    color: var(--red);
    font-size: 0.9em;
    cursor: pointer;
  }
`;

const RestaurantReviews = ({ reviews }) => {
  const renderReviewList = reviews.map((review, i) => (
    <div className="review-card" key={i}>
      <div className="review-card__header">
        <img
          data-testid="review-user-avatar"
          className="review-card__header-avatar"
          src={review.user.image_url}
          alt="Reviewer avatar"
        />
        <div className="review-card__header-right">
          <p
            data-testid="review-user-name"
            className="review-card__header-name"
          >
            {review.user.name}
          </p>

          <div className="review-card__header-stars-date">
            <img
              className="review-card__header-stars"
              src={getStars(review)}
              alt="star rating"
            />
            <p className="review-card__header-date">
              {formatReviewDate(review.time_created)}
            </p>
          </div>
        </div>
      </div>
      <p className="review-card__text">
        {review.text}
        <a
          className="review-card__link"
          href={review.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Read full review
        </a>
      </p>
    </div>
  ));

  return (
    <ReviewsWrapper className="reviews">{renderReviewList}</ReviewsWrapper>
  );
};

RestaurantReviews.propTypes = {
  reviews: PropTypes.array.isRequired
};

export default RestaurantReviews;
