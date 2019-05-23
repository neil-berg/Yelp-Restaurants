import React from 'react';

const NotFound = ({ handleOutsideClick }) => {
  return (
    <div onClick={handleOutsideClick}>
      <p>Not Found!</p>
    </div>
  );
};

export default NotFound;
