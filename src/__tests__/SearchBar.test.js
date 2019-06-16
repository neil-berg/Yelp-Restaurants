import React from 'react';
import { withRouter, Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { render, fireEvent, cleanup } from '@testing-library/react';
import * as helper from '../helper';

import SearchBar from '../components/SearchBar';

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

const route = '/some-route';
const props = {
  history: {},
  inputFood: '',
  setInputFood: jest.fn(() => {}),
  focus: '',
  setFocus: jest.fn(() => {}),
  handleOutsideClick: jest.fn(() => {})
};

describe('<SearchBar />', () => {
  test('rendering inputs with empty text', () => {
    const { getByPlaceholderText } = renderWithRouter(
      <SearchBar {...props} />,
      { route }
    );
    const foodInput = getByPlaceholderText('What are you in the mood for?');
    const locationInput = getByPlaceholderText(
      'City, neighborhood, zipcode, etc.'
    );

    expect(foodInput.value).toBe('');
    expect(locationInput.value).toBe('');
  });

  test('updates form inputs with new values', () => {
    const { getByPlaceholderText } = renderWithRouter(
      <SearchBar {...props} />,
      {
        route
      }
    );
    const foodInput = getByPlaceholderText('What are you in the mood for?');
    const locationInput = getByPlaceholderText(
      'City, neighborhood, zipcode, etc.'
    );

    // Since setInputFood is coming in as a prop,
    // we just checked that it was fired when the input
    // value was changed
    fireEvent.change(foodInput, { target: { value: 'Pizza' } });
    expect(props.setInputFood).toHaveBeenCalledTimes(1);

    // Values in the location input are set within the
    // scope as <SearchBar /> so we can directly check
    // that its new value matches what we change it to be
    fireEvent.change(locationInput, { target: { value: 'Los Angeles' } });
    expect(locationInput.value).toBe('Los Angeles');
    //debug();
  });

  test('createSearchSlug is called on valid form submit', () => {
    const slugMock = jest.spyOn(helper, 'createSearchSlug');
    // Bring in non-empty food input
    const newProps = { ...props, inputFood: 'Thai' };
    const { getByTestId, getByPlaceholderText } = renderWithRouter(
      <SearchBar {...newProps} />,
      {
        route
      }
    );

    const foodInput = getByPlaceholderText('What are you in the mood for?');
    const locationInput = getByPlaceholderText(
      'City, neighborhood, zipcode, etc.'
    );
    const submitButton = getByTestId('form-button');
    // Create non-empty location input
    fireEvent.change(locationInput, { target: { value: 'Los Angeles' } });
    fireEvent.click(submitButton);
    expect(slugMock).toHaveBeenCalledTimes(1);
  });
});
