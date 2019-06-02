import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock,
  faAngleDoubleRight,
  faAngleDoubleDown
} from '@fortawesome/free-solid-svg-icons';

import { isOpenNow, getOpenHours } from '../helper';

const HoursWrapper = styled.div`
  padding: 0 1rem;
  max-width: 600px;
  margin: 0 auto;

  .hours__current-status {
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
  }

  .hours__current-status-icon {
    margin-right: 0.5rem;
    font-size: 1.2em;
  }

  .hours__button {
    padding: 0.5rem;
    margin: 1rem 0;
    background: transparent;
    border: 1px grey solid;
    border-radius: 5px;
  }

  .hours__button-container {
    display: flex;
    align-items: center;
  }

  .hours__button-text {
    padding-right: 0.5rem;
  }

  .hours__list--open, .hours__list--closed {
    margin: 0;
    padding: 0;
    transition: all 0.35s ease-in-out;
  }

  .hours__list--open {
    height: 100%:
    opacity: 1;
  }

  .hours__list--closed {
    height: 0;
    opacity: 0;
    overflow-y: hidden;
  }

  .hours__item {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    border-top: 1px lightgrey solid;
    padding: 1em 0;
  }

  .hours__left-col {
    padding: 0;
    margin: 0;
  }

  .hours__right-col {
    //min-width: 130px;
    font-size: 0.85em;
    padding: 0;
    margin: 0;
  }

  .hours__right-col-times {
    text-align: right;
    padding: 0;
    margin: 0;
  }

  .hours__right-col-times:not(:first-child) {
    padding-top: 0.5rem;
  }

  .hours__right-col-closed {
    padding: 0;
    margin: 0;
  }
`;

const DetailsHours = ({ details }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const openHours = getOpenHours(details);
  const renderHoursList = hoursObj => {
    return Object.keys(hoursObj).map((day, i) => (
      <li key={i} className="hours__item">
        <p className="hours__left-col">{day}</p>
        <div className="hours__right-col">
          {hoursObj[day].length > 0 ? (
            hoursObj[day].map((timestamp, j) => (
              <p key={j} className="hours__right-col-times">
                {timestamp}
              </p>
            ))
          ) : (
            <p className="hours__right-col-closed">CLOSED</p>
          )}
        </div>
      </li>
    ));
  };
  return (
    <HoursWrapper className="hours">
      <div className="hours__current-status">
        <FontAwesomeIcon
          className="hours__current-status-icon"
          icon={faClock}
          color={isOpenNow(details) ? 'green' : 'red'}
        />
        <p className="hours__current-status-text">
          {isOpenNow(details) ? 'Open Now' : 'Closed Now'}
        </p>
      </div>

      <button
        className="hours__button"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? (
          <div className="hours__button-container">
            <span className="hours__button-text">Hide hours</span>
            <FontAwesomeIcon
              className="hours__button-icon"
              icon={faAngleDoubleDown}
            />
          </div>
        ) : (
          <div className="hours__button-container">
            <span className="hours__button-text">Show all hours</span>
            <FontAwesomeIcon
              className="hours__button-icon"
              icon={faAngleDoubleRight}
            />
          </div>
        )}
      </button>
      <ul className={`hours__list--${isMenuOpen ? 'open' : 'closed'}`}>
        {openHours ? renderHoursList(openHours) : null}
      </ul>
    </HoursWrapper>
  );
};

export default DetailsHours;
