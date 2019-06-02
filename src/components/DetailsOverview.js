import React from 'react';
import styled from 'styled-components';
import { getStars } from '../helper';

import yelpLogo from '../assets/yelp-icons/Yelp_trademark_RGB.png';

const OverviewWrapper = styled.div`
  padding: 0 1rem;
  max-width: 600px;
  margin: 0 auto;

  .overview__name-price,
  .overview__reviews {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .overview__name {
    margin: 0;
    font-size: 1.5em;
    font-weight: bold;
    font-family: 'Karla', sans-serif;
  }

  .overview__price {
    margin: 0;
  }

  .overview__rating {
    display: flex;
    align-items: center;
  }

  .overview__stars {
    width: 100px;
    height: auto;
  }
  .overview__count {
    color: grey;
    padding-left: 0.5rem;
    font-size: 0.9em;
  }

  .overview__link-yelp {
    display: inline-block;
  }

  .overview__icon-yelp {
    width: 75px;
    height: auto;
  }
`;

const DetailsOverview = ({ details }) => {
  return (
    <OverviewWrapper>
      <div className="overview__name-price">
        <p className="overview__name">{details.name}</p>
        <p className="overview__price">{details.price}</p>
      </div>
      <div className="overview__reviews">
        <p className="overview__rating">
          <img
            className="overview__stars"
            src={getStars(details)}
            alt="star rating"
          />
          <span className="overview__count">
            {details.review_count} reviews
          </span>
        </p>
        <a
          href={details.url}
          target="_blank"
          rel="noopener noreferrer"
          className="overview__link-yelp"
        >
          <img className="overview__icon-yelp" src={yelpLogo} alt="logo" />
        </a>
      </div>
    </OverviewWrapper>
  );
};

export default DetailsOverview;
