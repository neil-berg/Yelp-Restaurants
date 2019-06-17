import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import * as helper from '../helper';

import RestaurantCard from '../components/RestaurantCard';

afterEach(cleanup);

// Suppress artificial warning from React-DOM regarding "act()":
// https://github.com/testing-library/react-testing-library/issues/281
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});
afterAll(() => {
  console.error = originalError;
});

// Set spies on helper functions used in this component
const mockGetStars = jest.spyOn(helper, 'getStars');
const mockDistanceInMiles = jest.spyOn(helper, 'distanceInMiles');

// Create mock index and restuarant data that RestaurantCard receives as props
const mockIndex = 1;
const mockRestaurant = {
  alias: 'dune-los-angeles',
  categories: [
    { alias: 'falafel', title: 'Falafel' },
    { alias: 'salad', title: 'Salad' }
  ],
  coordinates: { latitude: 34.1169649464573, longitude: -118.262093149437 },
  display_phone: '(323) 486-7073',
  distance: 8229.337142061926,
  id: 'bY6RStcfjyCJtDr8nLpohQ',
  image_url:
    'https://s3-media1.fl.yelpcdn.com/bphoto/Mrb_VEp9eXFbHGTeZUKTRQ/o.jpg',
  is_closed: false,
  location: {
    address1: '3143 Glendale Blvd',
    address2: '',
    address3: '',
    city: 'Los Angeles',
    country: 'US',
    display_address: ['3143 Glendale Blvd', 'Los Angeles, CA 90039'],
    state: 'CA',
    zip_code: '90039'
  },
  name: 'Dune',
  phone: '+13234867073',
  price: '$$',
  rating: 4.5,
  review_count: 629,
  transactions: [],
  url:
    'https://www.yelp.com/biz/dune-los-angeles?adjust_creative=IFhGEwfPsYMvXBo_MAHtag&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=IFhGEwfPsYMvXBo_MAHtag'
};

describe('<RestaurantCard />', () => {
  test('card renders with overview details', () => {
    const { debug, getByText, getByTestId } = render(
      <RestaurantCard index={mockIndex} restaurant={mockRestaurant} />
    );

    // Assert that getStar and distanceInMiles helper
    // functions are each called once with restaurant properties
    expect(mockGetStars).toHaveBeenCalledTimes(1);
    expect(mockGetStars).toHaveBeenCalledWith(mockRestaurant);

    expect(mockDistanceInMiles).toHaveBeenCalledTimes(1);
    expect(mockDistanceInMiles).toHaveBeenCalledWith(mockRestaurant.distance);

    // Assert that restaurant name exists and has a link to Yelp page
    expect(getByText(mockRestaurant.name).textContent).toBe(
      `${mockIndex + 1}. ${mockRestaurant.name}`
    );
    expect(getByTestId('restaurant-link').href).toBe(mockRestaurant.url);
    expect(getByText(mockRestaurant.price).textContent);

    // Assert that the number of reviews is visible
    expect(getByTestId('review-count').textContent).toBe(
      `${mockRestaurant.review_count} reviews`
    );

    // Assert that restaurant address exists
    expect(getByTestId('restaurant-address').firstChild.textContent).toBe(
      mockRestaurant.location.address1
    );

    expect(
      getByTestId('restaurant-address').firstChild.nextSibling.textContent
    ).toBe(
      `${mockRestaurant.location.city}, ${mockRestaurant.location.state}${
        mockRestaurant.location.zip_code
      }`
    );

    // Assert that a button with "+" is visible initially
    expect(getByText('+')).toBeVisible;

    // Assert that button text changes to "-" when clicked
    fireEvent.click(getByText('+'));
    expect(getByText('-')).toBeVisible;
  });
});
