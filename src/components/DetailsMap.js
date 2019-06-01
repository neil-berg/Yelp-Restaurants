import React from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import styled from 'styled-components';

const MapWrapper = styled.div`
  max-width: 600px;
  margin: 1rem auto;
`;

const DetailsMap = ({ details }) => {
  try {
    const position = [
      details.coordinates.latitude,
      details.coordinates.longitude
    ];
    return (
      <MapWrapper>
        <div
          className="address"
          style={{ margin: '1rem', textAlign: 'center' }}
        >
          <p style={{ margin: 0, padding: 0 }}>
            {details.location.display_address[0]}
          </p>
          <p style={{ margin: 0, padding: 0 }}>
            {details.location.display_address[1]}
          </p>
        </div>
        <Map
          center={position}
          zoom={15}
          maxZoom={18}
          attributionControl={true}
          zoomControl={true}
          doubleClickZoom={true}
          scrollWheelZoom={true}
          dragging={true}
          animate={true}
          easeLinearity={0.35}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position} />
        </Map>
      </MapWrapper>
    );
  } catch (err) {
    return null;
  }
};

export default DetailsMap;
