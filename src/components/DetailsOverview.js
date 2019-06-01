import React from 'react';
import styled from 'styled-components';
import { getStars } from '../helper';

import yelpLogo from '../assets/yelp-icons/Yelp_trademark_RGB.png';

const OverviewWrapper = styled.div`
  padding: 0 1rem;
  max-width: 600px;
  margin: 0 auto;

  .overview-row1,
  .overview-row2 {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .row1-name {
    margin: 0;
    font-size: 1.5em;
    font-weight: bold;
    font-family: 'Karla', sans-serif;
  }

  .row1-price {
    margin: 0;
  }

  .row2-rating {
    display: flex;
    align-items: center;
  }

  .row2-stars {
    width: 100px;
    height: auto;
  }
  .row2-count {
    color: grey;
    padding-left: 0.5rem;
    font-size: 0.9em;
  }

  .row2-yelp-link {
    display: inline-block;
  }

  .row2-yelp-logo {
    width: 75px;
    height: auto;
  }
`;

const DetailsOverview = ({ details }) => {
  return (
    <OverviewWrapper>
      <div className="overview-row1">
        <p className="row1-name">{details.name}</p>
        <p className="row1-price">{details.price}</p>
      </div>
      <div className="overview-row2">
        <p className="row2-rating">
          <img
            className="row2-stars"
            src={getStars(details)}
            alt="star rating"
          />
          <span className="row2-count">{details.review_count} reviews</span>
        </p>
        <a
          href={details.url}
          target="_blank"
          rel="noopener noreferrer"
          className="row2-yelp-link"
        >
          <img className="row2-yelp-logo" src={yelpLogo} alt="logo" />
        </a>
      </div>
    </OverviewWrapper>
  );
};

export default DetailsOverview;
