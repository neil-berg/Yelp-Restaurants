import React from 'react';
import styled from 'styled-components';

import { ReactComponent as Donut } from '../assets/food-icons/donut.svg';

const NoResultsWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .noresults__text {
    text-align: center;
    font-size: 1.2em;
  }

  .noresults__icon {
    height: 50vh;
    margin: 1rem auto;
  }
`;

const NoResults = () => (
  <NoResultsWrapper className="noresults">
    <p className="noresults__text">
      Hm, no results found for this search. Try another one!
    </p>

    <Donut className="noresults__icon" />
  </NoResultsWrapper>
);

export default NoResults;
