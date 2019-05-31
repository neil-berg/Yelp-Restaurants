import React from 'react';
import styled from 'styled-components';

import { ReactComponent as Warning } from '../assets/yelp-icons/warning.svg';

const ErrorWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .warning-text {
    text-align: center;
    font-size: 1.2em;
  }

  .warning {
    height: 50vh;
    margin: 1rem auto;
  }
`;

const Error = () => (
  <ErrorWrapper>
    <p className="warning-text">
      Hm, an error occured with this search. Try another one!
    </p>

    <Warning className="warning" />
  </ErrorWrapper>
);

export default Error;
