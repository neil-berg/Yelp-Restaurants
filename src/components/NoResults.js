import React from 'react';
import styled from 'styled-components';

import { ReactComponent as Donut } from '../assets/food-icons/donut.svg';

const NoResultsWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .noresults-text {
    text-align: center;
    font-size: 1.2em;
  }

  .donut {
    height: 50vh;
    margin: 1rem auto;
  }
`;

const NoResults = () => (
  <NoResultsWrapper>
    <p className="noresults-text">
      Hm, no results found for this search. Try another one!
    </p>

    <Donut className="donut" />
  </NoResultsWrapper>
);

export default NoResults;
