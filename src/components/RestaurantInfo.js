import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

import yelpLogo from '../assets/yelp-icons/Yelp_trademark_RGB.png';
import { distanceInMiles, getStars } from '../helper';

const InfoContainer = styled.div`
  padding: 0.5rem 0.5rem 0 0.5rem;
  flex: 1;

  .info__row1,
  .info__row2,
  .info__row3,
  .info__row4 {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .info__row1-name {
    font-size: 1.25em;
    font-weight: bold;
    font-family: 'Karla', sans-serif;
    margin: 0;
    padding: 0;
    color: var(--red);
  }

  .info__row1-index {
    color: black;
  }

  .info__row2 {
    padding-top: 1rem;
  }

  .info__row2-stars-count {
    display: flex;
    align-items: center;
  }

  .info__row2-stars {
    width: 100px;
    height: auto;
  }

  .info__row2-count {
    color: grey;
    padding-left: 0.5rem;
    font-size: 0.9em;
  }

  .info__row2-price-distance {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: 0;
    padding: 0;
  }

  .info__row4 {
    padding-bottom: ${props => (props.showdetails === 'show' ? '0' : '1.5rem')};
  }

  .info__row4-address1,
  .info__row4-address2 {
    margin: 0;
    padding: 0;
    text-align: right;
  }

  .info__row4-zipcode {
    margin-left: 0.35rem;
  }

  .icon-yelp {
    width: 75px;
    height: auto;
  }

  .icon-circle {
    margin: 0 0.5rem;
    font-size: 6px;
    color: grey;
  }

  @media screen and (min-width: 600px) {
    .info__row4 {
      padding-bottom: 0;
    }
  }
`;

const RestaurantInfo = ({ index, restaurant, showdetails }) => {
  const categories = restaurant.categories
    .slice(0, 2)
    .map(category => category.title)
    .join(', ');

  return (
    <InfoContainer showdetails={showdetails}>
      <div className="info__row1">
        <a
          href={restaurant.url}
          target="_blank"
          rel="noopener noreferrer"
          className="info__row1-link"
        >
          <p className="info__row1-name">
            <span className="info__row1-index">{index + 1}. </span>
            {restaurant.name}
          </p>
        </a>
      </div>

      <div className="info__row2">
        <div className="info__row2-stars-count">
          <img
            className="info__row2-stars"
            src={getStars(restaurant)}
            alt="star rating"
          />
          <span className="info__row2-count">
            {restaurant.review_count} reviews
          </span>
        </div>
        <div className="info__row2-price-distance">
          <span className="info__row2-price">
            {restaurant.price ? restaurant.price : 'NA'}
          </span>
          <FontAwesomeIcon className="icon-circle" icon={faCircle} />
          <span className="info__row2--distance">
            {distanceInMiles(restaurant.distance)} mi
          </span>
        </div>
      </div>

      <div className="info__row3">
        <p className="info__row3-categories">{categories}</p>
        <p className="info__row3-phone">{restaurant.display_phone}</p>
      </div>

      <div className="info__row4">
        <a
          href={restaurant.url}
          target="_blank"
          rel="noopener noreferrer"
          className="info__row4-link-yelp"
        >
          <img className="icon-yelp" src={yelpLogo} alt="logo" />
        </a>
        <div className="info__row4-address">
          <p className="info__row4-address1">{restaurant.location.address1}</p>
          <p className="info__row4-address2">
            {restaurant.location.city}, {restaurant.location.state}
            <span className="info__row4-zipcode">
              {restaurant.location.zip_code}
            </span>
          </p>
        </div>
      </div>
    </InfoContainer>
  );
};

export default RestaurantInfo;
