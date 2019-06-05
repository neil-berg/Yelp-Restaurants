import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

import yelpLogo from '../assets/yelp-icons/Yelp_trademark_RGB.png';

import { distanceInMiles, getStars } from '../helper';

const Card = styled(animated.div)`
  //padding: 1rem 0 0 0;
  padding: 0;
  margin: 1rem;
  border: 1px lightgrey solid;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  max-width: 800px;

  .card__info--small {
    padding: 0.5rem 0.5rem 0 0.5rem;
  }

  .card__name {
    font-size: 1.25em;
    font-weight: bold;
    font-family: 'Karla', sans-serif;
    margin: 0;
    padding: 0;
    color: var(--red);
  }

  .card__index {
    color: black;
  }

  .card__fab {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    border: 1px black solid;
  }

  .card__stars-price {
    padding-top: 1rem;
    margin: 0;
    display: flex;
    align-items: center;
  }

  .card__stars {
    width: 100px;
    height: auto;
  }

  .card__price {
    margin-left: 1rem;
  }

  .card__distance-address-logo {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .card__distance-address {
    display: flex;
    align-items: center;
  }

  .card__icon-circle {
    margin: 0 0.5rem;
    font-size: 6px;
    color: grey;
  }

  .card__icon-yelp {
    width: 75px;
    height: auto;
  }

  .card__info--large {
    display: none;
    width: 100%;
    padding: 0.5rem;
  }

  .card__left-col {
    flex: 2;
  }

  .card__stars-count {
    display: flex;
    align-items: center;
  }

  .card__count {
    color: grey;
    padding-left: 0.5rem;
    font-size: 0.9em;
  }

  .card__right-col {
    flex: 1;
    text-align: right;
  }

  .card__price-distance {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: 0;
    padding: 0;
  }

  .card__address {
    margin: 0;
    padding: 0;
  }

  .card__zipcode {
    margin-left: 0.35rem;
  }

  .card__icon-circle {
    margin: 0 0.5rem;
    font-size: 6px;
    color: grey;
  }

  .card__phone {
    padding: 0.75rem 0;
    margin: 0;
  }

  @media screen and (min-width: 600px) {
    flex-direction: row;
    //padding: 1rem 0;

    .card__info--large {
      display: flex;
    }

    .card__info--small {
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
    <Card className="card" style={spring}>
      <CoverPhoto
        className="card__cover-photo"
        image_url={restaurant.image_url}
      />
      <div className="card__info--small">
        <Link
          className="card__details-link"
          to={`/restaurant/${restaurant.alias}/${restaurant.id}`}
        >
          <p className="card__name">
            <span className="card__index">{index + 1}. </span>
            {restaurant.name}
          </p>
        </Link>
        <button className="card__fab">+</button>
        <p className="card__stars-price">
          <img
            className="card__stars"
            src={getStars(restaurant)}
            alt="star rating"
          />
          <span className="card__price">{restaurant.price}</span>
        </p>
        <div className="card__distance-address-logo">
          <div className="card__distance-address">
            <span className="card__distance">
              {distanceInMiles(restaurant.distance)} mi
            </span>
            <FontAwesomeIcon className="card__icon-circle" icon={faCircle} />
            <span className="card__address">
              {restaurant.location.address1}
            </span>
          </div>
          <a
            href={restaurant.url}
            target="_blank"
            rel="noopener noreferrer"
            className="card__link-yelp"
          >
            <img className="card__icon-yelp" src={yelpLogo} alt="Yelp icon" />
          </a>
        </div>
      </div>

      <div className="card__info--large">
        <div className="card__left-col">
          <Link
            className="card__details-link"
            to={`/restaurant/${restaurant.alias}/${restaurant.id}`}
          >
            <p className="card__name">
              <span className="card__index">{index + 1}. </span>
              {restaurant.name}
            </p>
          </Link>
          <p className="card__stars-count">
            <img
              className="card__stars"
              src={getStars(restaurant)}
              alt="star rating"
            />
            <span className="card__count">
              {restaurant.review_count} reviews
            </span>
          </p>
          <p className="card__categories">{categories}</p>
          <button className="card__fab">+</button>
        </div>
        <div className="card__right-col">
          <p className="card__price-distance">
            <span className="card__price">{restaurant.price}</span>
            <FontAwesomeIcon className="card__icon-circle" icon={faCircle} />
            <span className="card__distance">
              {distanceInMiles(restaurant.distance)} mi
            </span>
          </p>
          <p className="card__phone">{restaurant.display_phone}</p>

          <p className="card__address">{restaurant.location.address1}</p>
          <p className="card__address">
            {restaurant.location.city}, {restaurant.location.state}
            <span className="card__zipcode">
              {restaurant.location.zip_code}
            </span>
          </p>
          <a
            href={restaurant.url}
            target="_blank"
            rel="noopener noreferrer"
            className="card__link-yelp"
          >
            <img className="card__icon-yelp" src={yelpLogo} alt="logo" />
          </a>
        </div>
      </div>
    </Card>
  );
};

export default RestaurantCard;
