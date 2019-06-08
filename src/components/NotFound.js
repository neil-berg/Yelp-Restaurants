import React from 'react';
import PropTypes from 'prop-types';
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

NotFound.propTypes = {
  handleOutsideClick: PropTypes.func.isRequired
};

export default NotFound;
