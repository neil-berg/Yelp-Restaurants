import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { ReactComponent as Warning } from '../assets/yelp-icons/warning.svg';

const ErrorWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .error__text {
    text-align: center;
    font-size: 1.2em;
  }

  .error__icon {
    height: 50vh;
    margin: 1rem auto;
  }
`;

const Error = ({ text }) => (
  <ErrorWrapper className="error">
    <p className="error__text">{text || 'Error'}</p>

    <Warning className="error__icon" />
  </ErrorWrapper>
);

Error.propTypes = {
  text: PropTypes.string
};

export default Error;
