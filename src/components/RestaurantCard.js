import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

import yelpLogo from '../assets/yelp-icons/Yelp_trademark_RGB.png';

import { distanceInMiles, getStars } from '../helper';

const Card = styled(animated.div)`
  padding: 1rem 0 0 0;
  margin: 0 1rem;
  border-bottom: 1px lightgrey solid;
  display: flex;
  flex-direction: column;
  max-width: 800px;

  .info-small {
    padding: 0.5rem 0.5rem 0 0.5rem;
    > p {
      margin: 0;
      padding: 0;
    }
    .name {
      font-size: 1.25em;
      font-weight: bold;
      font-family: 'Karla', sans-serif;
      margin: 0;
      padding: 0;
      color: var(--red);
    }
    .rating-price {
      padding-top: 1rem;
      display: flex;
      align-items: center;
      .rating {
        width: 100px;
        height: auto;
      }
      .price {
        color: grey;
        margin-left: 1rem;
      }
    }
    .distance-address-logo {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: grey;
      .icon-circle {
        margin: 0 0.5rem;
        font-size: 6px;
        color: lightgrey;
      }
    }
  }

  .yelp-logo {
    width: 75px;
    height: auto;
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
        font-family: 'Karla', sans-serif;
        margin: 0;
        padding: 0;
        color: var(--red);
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

      .zipcode {
        padding-left: 0.35rem;
      }

      .phone {
        padding: 0.75rem 0;
      }
    }

    .categories .category {
      padding-right: 0.5rem;
    }
  }

  @media screen and (min-width: 600px) {
    flex-direction: row;
    padding: 1rem 0;

    .info-large {
      display: flex;
    }

    .info-small {
      display: none;
    }
  }
`;

const CoverPhoto = styled.div`
  height: 175px;
  width: auto;
  background-image: url("${props => props.image_url}");
  background-position: center 75%;
  background-size: cover;
  border-radius: 5px;
  
  @media screen and (min-width: 550px) {
    min-width: 175px;
  }
`;

const RestaurantCard = ({ index, restaurant }) => {
  const categories = restaurant.categories
    .map(category => category.title)
    .join(', ');

  const spring = useSpring({
    to: { opacity: '1' },
    from: { opacity: '0' },
    config: { duration: 400 }
  });

  // const spring = useSpring({
  //   to: { marginTop: '0' },
  //   from: { marginTop: '100px' }
  // });

  return (
    <Card style={spring}>
      <CoverPhoto image_url={restaurant.image_url} />
      <div className="info-small">
        <Link to={`/restaurant/${restaurant.alias}/${restaurant.id}`}>
          <p className="name">
            <span className="restaurant-index" style={{ color: 'black' }}>
              {index + 1}.{' '}
            </span>
            {restaurant.name}
          </p>
        </Link>
        <p className="rating-price">
          <img
            className="rating"
            src={getStars(restaurant)}
            alt="star rating"
          />
          <span className="price">{restaurant.price}</span>
        </p>
        <div className="distance-address-logo">
          <div className="distance-address">
            <span className="distance">
              {distanceInMiles(restaurant.distance)} mi
            </span>
            <FontAwesomeIcon className="icon-circle" icon={faCircle} />
            <span className="address">{restaurant.location.address1}</span>
          </div>
          <a
            href={restaurant.url}
            target="_blank"
            rel="noopener noreferrer"
            className="yelp-link"
          >
            <img className="yelp-logo" src={yelpLogo} alt="logo" />
          </a>
        </div>
      </div>

      <div className="info-large">
        <div className="left">
          <Link
            className="restaurant-link"
            to={`/restaurant/${restaurant.alias}/${restaurant.id}`}
          >
            <p className="name">
              <span className="restaurant-index" style={{ color: 'black' }}>
                {index + 1}.{' '}
              </span>
              {restaurant.name}
            </p>
          </Link>
          <p className="rating-count">
            <img
              className="rating"
              src={getStars(restaurant)}
              alt="star rating"
            />
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
            <span className="zipcode">{restaurant.location.zip_code}</span>
          </p>
          <a
            href={restaurant.url}
            target="_blank"
            rel="noopener noreferrer"
            className="yelp-link"
          >
            <img className="yelp-logo" src={yelpLogo} alt="logo" />
          </a>
        </div>
      </div>
    </Card>
  );
};

export default RestaurantCard;
