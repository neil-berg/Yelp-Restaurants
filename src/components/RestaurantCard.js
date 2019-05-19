import React from 'react';
import styled from 'styled-components';

import { distanceInMiles } from '../helper';

const Card = styled.div`
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  margin: 0.5rem;
  border-radius: 5px;
  background: beige;

  img {
    display: block;
    width: 100%;
    height: auto;
  }
`;

const RestaurantCard = ({ restaurant }) => {
  return (
    <Card>
      <img
        src={`${restaurant.image_url}`}
        alt={`Cover for ${restaurant.name}`}
      />
      <p className="alias">{restaurant.name}</p>
      <p className="rating">{restaurant.rating}</p>
      <p className="distance">{distanceInMiles(restaurant.distance)} mi</p>
      <p className="price">{restaurant.price}</p>
    </Card>
  );
};

export default RestaurantCard;
