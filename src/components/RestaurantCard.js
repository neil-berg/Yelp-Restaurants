import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faStarHalfAlt,
  faCircle
} from '@fortawesome/free-solid-svg-icons';

import { distanceInMiles, getStars } from '../helper';

const Card = styled.div`
  box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.2);
  margin: 1rem 0.5rem;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  max-width: 700px;

  .info-small {
    padding: 0.5rem;
    > p {
      margin: 0;
      padding: 0;
    }
    .name {
      font-size: 1.25em;
      font-weight: bold;
      margin: 0;
      padding: 0;
    }
    .rating-price {
      padding: 0.5rem 0;
      .price {
        color: grey;
        margin-left: 1rem;
      }
    }
    .distance-address {
      display: flex;
      align-items: center;
      color: grey;
      .icon-circle {
        margin: 0 0.5rem;
        font-size: 6px;
        color: lightgrey;
      }
    }
  }

  .info-large {
    display: none;
    width: 100%;
    padding: 0.5rem;
    .left {
      flex: 1;

      .restaurant-link .name {
        font-size: 1.25em;
        font-weight: bold;
        margin: 0;
        padding: 0;
      }

      .rating-count .count {
        color: grey;
        padding-left: 0.5rem;
        font-size: 0.9em;
      }
    }
    .right {
      flex: 1;
      text-align: right;

      > p,
      span {
        padding: 0;
        margin: 0;
      }
      .price-distance {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        color: grey;

        .icon-circle {
          margin: 0 0.5rem;
          font-size: 6px;
          color: lightgrey;
        }
      }

      .phone {
        padding: 0.75rem 0;
      }
    }

    .categories .category {
      padding-right: 0.5rem;
    }
  }

  @media screen and (min-width: 550px) {
    margin: 1rem auto;
    flex-direction: row;

    .info-large {
      display: flex;
    }

    .info-small {
      display: none;
    }
  }
`;

const CoverPhoto = styled.div`
  height: 200px;
  width: auto;
  background-image: url("${props => props.image_url}");
  background-position: center 75%;
  background-size: cover;
  border-radius: 5px 5px 0 0;
  
  @media screen and (min-width: 550px) {
    min-width: 200px;
    border-radius: 5px 0 0 5px;
  }
`;

const RestaurantCard = ({ restaurant }) => {
  const stars = getStars(restaurant);

  const categories = restaurant.categories
    .map(category => category.title)
    .join(', ');

  return (
    <Card>
      <CoverPhoto image_url={restaurant.image_url} />
      <div className="info-small">
        <Link to={`/restaurant/${restaurant.alias}/${restaurant.id}`}>
          <p className="name">{restaurant.name}</p>
        </Link>
        <p className="rating-price">
          <span className="rating">{stars}</span>
          <span className="price">{restaurant.price}</span>
        </p>
        <p className="distance-address">
          <span className="distance">
            {distanceInMiles(restaurant.distance)} mi
          </span>
          <FontAwesomeIcon className="icon-circle" icon={faCircle} />
          <span className="address">{restaurant.location.address1}</span>
        </p>
      </div>

      <div className="info-large">
        <div className="left">
          <Link
            className="restaurant-link"
            to={`/restaurant/${restaurant.alias}/${restaurant.id}`}
          >
            <p className="name">{restaurant.name}</p>
          </Link>
          <p className="rating-count">
            <span className="rating">{stars}</span>
            <span className="count">{restaurant.review_count} reviews</span>
          </p>
          <p className="categories">{categories}</p>
        </div>
        <div className="right">
          <p className="price-distance">
            <span className="price">{restaurant.price}</span>
            <FontAwesomeIcon className="icon-circle" icon={faCircle} />
            <span className="distance">
              {distanceInMiles(restaurant.distance)} mi
            </span>
          </p>
          <p className="phone">{restaurant.display_phone}</p>
          <p className="address1">{restaurant.location.address1}</p>
          <p className="address2">
            {restaurant.location.city}, {restaurant.location.state}
            <span className="zip_code">{restaurant.location.zip_code}</span>
          </p>
        </div>
      </div>
    </Card>
  );
};

export default RestaurantCard;
