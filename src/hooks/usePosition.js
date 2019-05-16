import React, { useState, useEffect } from 'react';

export const usePosition = () => {
  const [position, setPosition] = useState({});
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position =>
      setPosition(position.coords)
    );
  }, []);
  return position;
};
