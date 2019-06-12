import React, { useState } from 'react';
import { withRouter, Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { render, container, fireEvent, cleanup } from '@testing-library/react';
import 'jest-dom/extend-expect';

import SearchBar from '../components/SearchBar';
import Home from '../components/Home';

afterEach(cleanup);

//https://github.com/testing-library/react-testing-library/blob/master/examples/__tests__/react-router.js
function renderWithRouter(
  ui,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] })
  } = {}
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history
  };
}

const LocationDisplay = withRouter(({ location }) => (
  <div data-testid="location-display">{location.pathname}</div>
));

describe('Home tests', () => {
  test('rendering search bar with empty text', () => {
    const route = '/some-route';
    const searchBarProps = {
      history: {},
      inputFood: '',
      setInputFood: jest.fn(() => {}),
      focus: '',
      setFocus: jest.fn(() => {}),
      handleOutsideClick: jest.fn(() => {})
    };
    const { getByPlaceholderText } = renderWithRouter(
      <SearchBar {...searchBarProps} />,
      { route }
    );
    const foodInput = getByPlaceholderText(/What are you in the mood for?/);
    expect(foodInput.value).toBe('');
  });

  test('home page renders 12 food options', () => {
    const homeProps = {
      setInputFood: jest.fn(() => {}),
      handleOutsideClick: jest.fn(() => {})
    };
    const { getAllByTestId } = render(<Home {...homeProps} />);

    // Twelve divs
    // const foodOptions = getAllByTestId('food-option');
    // expect(foodOptions.length).toBe(12);

    // Twelve spans with food name as textContent
    const foodOptionNames = getAllByTestId('food-option-name').map(
      item => item.textContent
    );
    expect(foodOptionNames).toEqual([
      'Sushi',
      'Tacos',
      'Pizza',
      'Pasta',
      'Thai',
      'American',
      'Mediterranean',
      'French',
      'BBQ',
      'Vegan',
      'Waffles',
      'Dessert'
    ]);
  });
});
