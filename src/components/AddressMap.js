import React from 'react';
import { Link } from 'react-router-dom';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import styled from 'styled-components';

import { getMapCenter, distanceInMiles, getStars } from '../helper';

const AddressMap = ({ restaurants }) => {
  const [centerLat, centerLon] = getMapCenter(restaurants);

  const markers = restaurants.map((restaurant, i) => {
    const stars = getStars(restaurant);
    return (
      <Marker
        key={restaurant.id}
        position={[
          restaurant.coordinates.latitude,
          restaurant.coordinates.longitude
        ]}
      >
        <Popup>
          <Link to={`/restaurant/${restaurant.alias}/${restaurant.id}`}>
            <p style={{ margin: '0', padding: '0', fontWeight: 'bold' }}>
              {restaurant.name}
            </p>
          </Link>
          {stars}
          <p style={{ margin: '0', padding: '0' }}>
            {distanceInMiles(restaurant.distance)} mi
          </p>
        </Popup>
      </Marker>
    );
  });

  return (
    <Map
      center={[centerLat || 25, centerLon || -120]}
      zoom={12}
      maxZoom={15}
      attributionControl={true}
      zoomControl={true}
      doubleClickZoom={true}
      scrollWheelZoom={true}
      dragging={true}
      animate={true}
      easeLinearity={0.35}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
      />
      {markers}
    </Map>
  );
};

export default AddressMap;
