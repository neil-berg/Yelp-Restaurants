import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
//import 'jest-dom/extend-expect';

import Home from '../components/Home';

afterEach(cleanup);

// Global fakeProps to <Home />
const setInputFood = jest.fn(() => {});
const handleOutsideClick = jest.fn(() => {});

// Setup the test suite for <Home />
describe('<Home />', () => {
  test('12 options exist', () => {
    // Arrange <Home /> component and food option divs
    const { getAllByTestId } = render(
      <Home
        setInputFood={setInputFood}
        handleOutsideClick={handleOutsideClick}
      />
    );

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

  test('input food value set when food option is clicked', () => {
    const { getAllByTestId } = render(
      <Home
        setInputFood={setInputFood}
        handleOutsideClick={handleOutsideClick}
      />
    );
    const foodOptions = getAllByTestId('food-option');

    // Assert that there are 12 options and that setInputFood
    // is fired on every click to the food option container
    expect(foodOptions.length).toBe(12);

    fireEvent.click(foodOptions[0]);
    expect(setInputFood).toHaveBeenCalledTimes(1);
    fireEvent.click(foodOptions[0]);
    expect(setInputFood).toHaveBeenCalledTimes(2);
  });
});
