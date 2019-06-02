import React from 'react';
import { ReactComponent as NotFoundSVG } from '../assets/ui-icons/error-404.svg';

const NotFound = ({ handleOutsideClick }) => {
  return (
    <div
      onClick={handleOutsideClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <NotFoundSVG style={{ width: '50vw' }} />
    </div>
  );
};

export default NotFound;
