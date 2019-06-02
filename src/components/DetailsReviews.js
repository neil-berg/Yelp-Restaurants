import React from 'react';
import styled from 'styled-components';

import { getStars, formatReviewDate } from '../helper';

const ReviewsWrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, 325px);
  grid-gap: 1rem;
  justify-content: center;
  margin-bottom: 1rem;

  .review-card {
    width: 325px;
    border: 1px lightgrey solid;
    border-radius: 5px;
    box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.2);
    padding: 1rem;
  }

  .review-card__row1,
  .review-card__row2 {
    display: flex;
    align-items: center;
  }
  .review-card__avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .review-card__name {
    margin-left: 1em;
  }

  .review-card__stars {
    width: 100px;
    height: auto;
    margin: 1em 0;
  }

  .review-card__date {
    margin-left: 1rem;
    color: grey;
  }

  .review-card__text {
    margin: 0;
    padding: 0 0 0.5rem 0;
  }

  .review-card__link {
    color: var(--red);
    font-size: 0.9em;
    cursor: pointer;
  }
`;

const DetailsReviews = ({ reviews }) => {
  const renderReviewList = reviews.map((review, i) => (
    <div className="review-card" key={i}>
      <div className="review-card__row1">
        <img
          className="review-card__avatar"
          src={review.user.image_url}
          alt="Reviewer avatar"
        />
        <p className="review-card__name">{review.user.name}</p>
      </div>
      <div className="review-card__row2">
        <img
          className="review-card__stars"
          src={getStars(review)}
          alt="star rating"
        />
        <p className="review-card__date">
          {formatReviewDate(review.time_created)}
        </p>
      </div>
      <div className="review-card__row3">
        <p className="review-card__text">{review.text}</p>
        <a
          className="review-card__link"
          href={review.url}
          target="_blank"
          rel="noopener noreferrer"
        >
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
