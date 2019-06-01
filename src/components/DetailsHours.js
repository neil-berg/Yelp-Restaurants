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

  .open-now {
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
  }

  .clock-icon {
    margin-right: 0.5rem;
    font-size: 1.2em;
  }

  .btn-reveal-list {
    padding: 0.5rem;
    margin: 1rem 0;
    background: transparent;
    border: 1px grey solid;
    border-radius: 5px;
  }

  .btn-text-container {
    display: flex;
    align-items: center;

    .btn-text {
      padding-right: 0.5rem;
    }
  }

  .hours-list {
    margin: 0;
    padding: 0;
    transition: all 0.35s ease-in-out;
  }

  .hours-list.open {
    height: 100%:
    opacity: 1;
  }

  .hours-list.closed {
    height: 0;
    opacity: 0;
    overflow-y: hidden;
  }

  .day {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    border-top: 1px lightgrey solid;
    padding: 0.5em 0;
  }

  .day-name {
    padding: 0;
    margin: 0;
  }

  .hours-container {
    min-width: 130px;
    font-size: 0.85em;
    padding: 0;
    margin: 0;
  }

  .hours {
    text-align: right;
    padding: 0;
    margin: 0;
  }

  .hours:first-child {
    padding-bottom: 1em;
  }

  .hours.closed {
    padding-top: 0;
  }
`;

const DetailsHours = ({ details }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openHours = getOpenHours(details);
  const renderHoursList = hoursObj => {
    return Object.keys(hoursObj).map((day, i) => (
      <li key={i} className="day">
        <p className="day-name">{day}</p>
        <div className="hours-container">
          {hoursObj[day].length > 0 ? (
            hoursObj[day].map((timestamp, j) => (
              <p key={j} className="hours">
                {timestamp}
              </p>
            ))
          ) : (
            <p className="hours closed">CLOSED</p>
          )}
        </div>
      </li>
    ));
  };
  return (
    <HoursWrapper>
      <div className="open-now">
        <FontAwesomeIcon
          className="clock-icon"
          icon={faClock}
          color={isOpenNow(details) ? 'green' : 'red'}
        />
        <p className="open-now">
          {isOpenNow(details) ? 'Open Now' : 'Closed Now'}
        </p>
      </div>

      <button
        className="btn-reveal-list"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? (
          <div className="btn-text-container">
            <span className="btn-text">Hide hours</span>
            <FontAwesomeIcon icon={faAngleDoubleDown} />
          </div>
        ) : (
          <div className="btn-text-container">
            <span className="btn-text">Show all hours</span>
            <FontAwesomeIcon icon={faAngleDoubleRight} />
          </div>
        )}
      </button>
      <ul className={`hours-list ${isMenuOpen ? 'open' : 'closed'}`}>
        {openHours ? renderHoursList(openHours) : null}
      </ul>
    </HoursWrapper>
  );
};

export default DetailsHours;
