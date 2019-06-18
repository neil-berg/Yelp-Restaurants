import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';

import RestaurantInfo from './RestaurantInfo';
import RestaurantDetails from './RestaurantDetails';

const CardContainer = styled(animated.div)`
  padding: ${props => (props.showdetails === 'show' ? '0' : '0 0 1.5rem 0')};
  margin: 1rem 1rem 2rem 1rem;
  border: 1px lightgrey solid;
  border-radius: 5px;
  max-width: 800px;
  background: white;
  position: relative;

  .card__photo-info,
  .card__hours-reviews {
    display: flex;
    flex-direction: column;
  }

  .card__fab {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    border: 1px black solid;
    position: absolute;
    bottom: 0;
    right: 50%;
    transform: translate3d(50%, 50%, 0);
    cursor: pointer;
    background: var(--red);
    border: 1px var(--red) solid;
    color: white;
    font-size: 1.5em;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
  }

  .card__fab:focus {
    outline: none;
  }

  @media screen and (min-width: 600px) {
    padding: 0;
    .card__photo-info {
      flex-direction: row;
    }
  }
`;

const CoverPhoto = styled.div`
  height: 175px;
  width: auto;
  background-image: url("${props => props.image_url}");
  background-position: center 75%;
  background-size: cover;
  border-radius: 5px 5px 0 0;
  
  @media screen and (min-width: 600px) {
    min-width: 175px;
    border-radius: 5px 0 0 5px;
  }
`;

const RestaurantCard = ({ index, restaurant }) => {
  const spring = useSpring({
    to: { opacity: '1' },
    from: { opacity: '0' },
    config: { duration: 400 }
  });

  const [showDetails, setShowDetails] = useState(false);

  return (
    <CardContainer
      className="card"
      showdetails={showDetails ? 'show' : 'hide'}
      style={spring}
    >
      <div className="card__photo-info">
        <CoverPhoto className="card__photo" image_url={restaurant.image_url} />
        <RestaurantInfo
          className="card__info"
          index={index}
          restaurant={restaurant}
          showDetails={showDetails ? 'show' : 'hide'}
        />
      </div>
      <RestaurantDetails
        showDetails={showDetails}
        restaurantID={restaurant.id}
      />
      <button
        className="card__fab"
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? '-' : '+'}
      </button>
    </CardContainer>
  );
};

RestaurantCard.propTypes = {
  index: PropTypes.number.isRequired,
  restaurant: PropTypes.shape({
    alias: PropTypes.string,
    categories: PropTypes.array.isRequired,
    coordinates: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired
    }),
    display_phone: PropTypes.string.isRequired,
    distance: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired,
    is_closed: PropTypes.bool,
    location: PropTypes.shape({
      address1: PropTypes.string,
      address2: PropTypes.string,
      address3: PropTypes.string,
      city: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      display_address: PropTypes.array.isRequired,
      state: PropTypes.string.isRequired,
      zip_code: PropTypes.string.isRequired
    }),
    name: PropTypes.string.isRequired,
    price: PropTypes.string,
    rating: PropTypes.number.isRequired,
    review_count: PropTypes.number.isRequired,
    transactions: PropTypes.array,
    url: PropTypes.string.isRequired
  })
};

export default RestaurantCard;
