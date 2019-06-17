import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

import { getOpenHours } from '../helper';

const HoursWrapper = styled.section`
  padding: 0 1rem;
  max-width: 600px;
  margin: 0 auto;
  width: 100%;

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

  .hours__list {
    margin: 0;
    padding: 0;
  }

  .hours__item {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    border-top: 1px lightgrey solid;
    padding: 0.6em 0;
  }

  .hours__left-col {
    padding: 0;
    margin: 0;
  }

  .hours__right-col {
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

const RestaurantHours = ({ hours }) => {
  const openHours = getOpenHours(hours.open);

  const renderHoursList = hoursObj => {
    return Object.keys(hoursObj).map((day, i) => (
      <li data-testid="restaurant-hours-item" key={i} className="hours__item">
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
      {hours.open ? (
        <>
          <div className="hours__current-status">
            <FontAwesomeIcon
              className="hours__current-status-icon"
              icon={faClock}
              color={hours.is_open_now ? 'green' : 'red'}
            />
            <p className="hours__current-status-text">
              {hours.is_open_now ? 'Open Now' : 'Closed Now'}
            </p>
          </div>
          <ul className="hours__list">{renderHoursList(openHours)}</ul>
        </>
      ) : null}
    </HoursWrapper>
  );
};

RestaurantHours.propTypes = {
  hours: PropTypes.object.isRequired
};

export default RestaurantHours;
