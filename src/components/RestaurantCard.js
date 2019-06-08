import React, { useState } from 'react';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';

import RestaurantInfo from './RestaurantInfo';
import RestaurantHours from './RestaurantHours';
import RestaurantReviews from './RestaurantReviews';

const CardContainer = styled(animated.div)`
  padding: 0;
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
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  @media screen and (min-width: 600px) {
    .card__photo-info {
      flex-direction: row;
    }

    .card__fab {
      transform: translate3d(calc(50% + 75px), 50%, 0);
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
    <CardContainer className="card" style={spring}>
      <div className="card__photo-info">
        <CoverPhoto className="card__photo" image_url={restaurant.image_url} />
        <RestaurantInfo
          className="card__info"
          index={index}
          restaurant={restaurant}
        />
      </div>
      <div className="card__hours-reviews">
        <RestaurantHours
          showDetails={showDetails}
          restaurantID={restaurant.id}
        />
        <RestaurantReviews
          showDetails={showDetails}
          restaurantID={restaurant.id}
        />
      </div>
      <button
        className="card__fab"
        onClick={() => setShowDetails(!showDetails)}
      >
        +
      </button>
    </CardContainer>
  );
};

export default RestaurantCard;
