import React from 'react';
import styled from 'styled-components';
import { getStars } from '../helper';

const OverviewWrapper = styled.div`
  padding: 0 1rem;
  max-width: 600px;
  margin: 0 auto;

  .name-price {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .name {
      margin: 0;
      font-size: 1.5em;
      font-weight: bold;
      font-family: 'Karla', sans-serif;
    }

    .price {
      margin: 0;
    }
  }

  .rating-count {
    display: flex;
    align-items: center;
  }

  .rating-count .rating {
    width: 100px;
    height: auto;
  }
  .rating-count .count {
    color: grey;
    padding-left: 0.5rem;
    font-size: 0.9em;
  }
`;

const DetailsOverview = ({ details }) => {
  return (
    <OverviewWrapper>
      <div className="name-price">
        <p className="name">{details.name}</p>
        <p className="price">{details.price}</p>
      </div>
      <p className="rating-count">
        <img className="rating" src={getStars(details)} alt="star rating" />
        <span className="count">{details.review_count} reviews</span>
      </p>
    </OverviewWrapper>
  );
};

export default DetailsOverview;
