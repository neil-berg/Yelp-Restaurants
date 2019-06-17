import React from 'react';
import { cleanup, render, waitForElement } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import mockAxios from 'axios';
import * as helper from '../helper';

import RestaurantList from '../components/RestaurantList';
import Loading from '../components/Loading';

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

// Overwite global scorllTo method on the window object
// that is set in RestaurantList
window.scrollTo = jest.fn();

// Setup a fake match object
const match = {
  isExact: true,
  params: {
    locID: 'loc=los+angeles+ca',
    pageID: 'page=1',
    termID: 'tacos'
  },
  path: '/search/:termID/:locID/:pageID',
  url: '/search/tacos/loc=los+angeles+ca/page=1'
};

// Mock the handleOutsideClick function
const handleOutsideClick = jest.fn();

// Spy on the parseSearchParams helper function
const mockParseSearchParams = jest.spyOn(helper, 'parseSearchParams');

// Create fake response from yelp API GET command
const mockResponse = {
  data: {
    businesses: [
      {
        alias: 'pinches-tacos-los-angeles',
        categories: [{ alias: 'mexican', title: 'Mexican' }],
        coordinates: { latitude: 34.09772, longitude: -118.36769 },
        display_phone: '(323) 650-0614',
        distance: 5860.408350464527,
        id: 'xVgz_F3gnbhyn_2goJ8vYQ',
        image_url:
          'https://s3-media3.fl.yelpcdn.com/bphoto/IJGOshRYGlVYLMWh31Wyvg/o.jpg',
        is_closed: false,
        location: {
          address1: '8200 W Sunset Blvd',
          address2: '',
          address3: '',
          city: 'Los Angeles',
          country: 'US',
          display_address: ['8200 W Sunset Blvd', 'Los Angeles, CA 90046'],
          state: 'CA',
          zip_code: '90046'
        },
        name: 'Pinches Tacos',
        phone: '+13236500614',
        price: '$',
        rating: 4,
        review_count: 787,
        url:
          'https://www.yelp.com/biz/pinches-tacos-los-angeles?adjust_creative=IFhGEwfPsYMvXBo_MAHtag&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=IFhGEwfPsYMvXBo_MAHtag'
      },
      {
        alias: 'guisados-west-hollywood',
        categories: [{ alias: 'mexican', title: 'Mexican' }],
        coordinates: { latitude: 34.0844498, longitude: -118.3853226 },
        display_phone: '(310) 777-0310',
        distance: 6411.620748370255,
        id: '_o6cTaR_pnm2XucZS6fTug',
        image_url:
          'https://s3-media2.fl.yelpcdn.com/bphoto/UAnlaz1gAlADKnixEV8sGg/o.jpg',
        is_closed: false,
        location: {
          address1: '8935 Santa Monica Blvd',
          address2: '',
          address3: '',
          city: 'West Hollywood',
          country: 'US',
          display_address: [
            '8935 Santa Monica Blvd',
            'West Hollywood, CA 90069'
          ],
          state: 'CA',
          zip_code: '90069'
        },
        name: 'Guisados',
        phone: '+13107770310',
        price: '$',
        rating: 4.5,
        review_count: 765,
        transactions: ['pickup', 'delivery'],
        url:
          'https://www.yelp.com/biz/guisados-west-hollywood?adjust_creative=IFhGEwfPsYMvXBo_MAHtag&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=IFhGEwfPsYMvXBo_MAHtag'
      }
    ]
  }
};

describe('<RestaurantList />', () => {
  test('fetches data and displays restaurants', async () => {
    window.scrollTo.mockClear();
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(mockResponse));
    const { getByText, getByTestId, getAllByTestId, debug } = render(
      <MemoryRouter>
        <RestaurantList match={match} handleOutsideClick={handleOutsideClick} />
      </MemoryRouter>
    );

    // Gets called twice since the component rerenders twice
    // by the time data fetching occurs
    expect(mockParseSearchParams).toHaveBeenCalledTimes(2);

    // Check for loading dots components before data arrives
    expect(getByTestId('loading-dots')).toBeInTheDocument;

    // Data arrives, so we should see the overall wrapper for the list
    await waitForElement(() => getByTestId('restaurant-wrapper'));
    expect(getByTestId('restaurant-wrapper')).toBeInTheDocument;

    // 2 restaurants should be visisble, since 2 are included in the mocked response
    const restaurantItems = await getAllByTestId('restaurant-list-item');
    expect(restaurantItems.length).toBe(mockResponse.data.businesses.length);

    // Names of each restaurant should be visible to the user
    expect(getByText('Pinches Tacos')).toBeInTheDocument;
    expect(getByText('Guisados')).toBeInTheDocument;
    //debug();
  });
});
