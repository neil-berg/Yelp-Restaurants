import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  waitForElement
} from '@testing-library/react';
import * as helper from '../helper';
import mockAxios from 'axios';

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
const mockGetOpenHours = jest.spyOn(helper, 'getOpenHours');
const mockFormatReviewDate = jest.spyOn(helper, 'formatReviewDate');

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

// mock hours and reviews API response data
const mockHours = {
  data: {
    hours: [
      {
        hours_type: 'REGULAR',
        is_open_now: true,
        open: [
          { is_overnight: false, start: '1000', end: '2200', day: 0 },
          { is_overnight: false, start: '1000', end: '2200', day: 1 },
          { is_overnight: false, start: '1000', end: '2200', day: 2 },
          { is_overnight: false, start: '1000', end: '2200', day: 3 },
          { is_overnight: false, start: '1000', end: '2200', day: 4 },
          { is_overnight: false, start: '1000', end: '2200', day: 5 },
          { is_overnight: false, start: '1000', end: '2200', day: 6 }
        ]
      }
    ]
  }
};

// Create mock reviews that RestaurantCard
const mockReviews = {
  data: {
    reviews: [
      {
        id: 'XOufenw_mNLWlKAz0GPTeA',
        rating: 5,
        text:
          "I was in Ireland with a friend a few years ago when we had this killer falafel at a farmer's market. Their creation was oh-so-fresh and it made our...",
        time_created: '2019-06-10 10:34:29',
        url:
          'https://www.yelp.com/biz/dune-los-angeles?adjust_creative=IFhGEwfPsYMvXBo_MAHtag&hrid=XOufenw_mNLWlKAz0GPTeA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_reviews&utm_source=IFhGEwfPsYMvXBo_MAHtag',
        user: {
          id: '-rleYbGDq6rR1oTJFWG7og',
          image_url:
            'https://s3-media4.fl.yelpcdn.com/photo/4dSqEQQ5Ta4MpsE6AnFyeA/o.jpg',
          name: 'Marcela H.',
          profile_url:
            'https://www.yelp.com/user_details?userid=-rleYbGDq6rR1oTJFWG7og'
        }
      },
      {
        id: 'POnSANRuK9h8V3YYnN3Vrg',
        rating: 4,
        text:
          "it's a solid spot for a healthy mediterranean fix. i get the hummus tabouleh plate which also comes with pita, picked beets and onions, fresh greens, and a...",
        time_created: '2019-06-12 11:24:27',
        url:
          'https://www.yelp.com/biz/dune-los-angeles?adjust_creative=IFhGEwfPsYMvXBo_MAHtag&hrid=POnSANRuK9h8V3YYnN3Vrg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_reviews&utm_source=IFhGEwfPsYMvXBo_MAHtag',
        user: {
          id: 'Ym-KYBbY8Sf5n7b2-UVnqg',
          image_url:
            'https://s3-media1.fl.yelpcdn.com/photo/-sjQh07zwSuIFUYT16AZaw/o.jpg',
          name: 'carolyn p.',
          profile_url:
            'https://www.yelp.com/user_details?userid=Ym-KYBbY8Sf5n7b2-UVnqg'
        }
      },
      {
        id: 'ICh9XEiz9Uhde4TJMGPRjg',
        rating: 3,
        text:
          'this review is solely for the take-out side of falafel i bought to make a sandwich with at home. falafels were good & came with a lashing of hummos.↵↵in...',
        time_created: '2019-06-11 17:34:40',
        url:
          'https://www.yelp.com/biz/dune-los-angeles?adjust_creative=IFhGEwfPsYMvXBo_MAHtag&hrid=ICh9XEiz9Uhde4TJMGPRjg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_reviews&utm_source=IFhGEwfPsYMvXBo_MAHtag',
        user: {
          id: 'lSUO0kS312VAk1F8fm7TTQ',
          image_url:
            'https://s3-media2.fl.yelpcdn.com/photo/os9NEgGVUKoPdwE-5-E9pA/o.jpg',
          name: 'Jeanne W.',
          profile_url:
            'https://www.yelp.com/user_details?userid=lSUO0kS312VAk1F8fm7TTQ'
        }
      }
    ]
  }
};

describe('<RestaurantCard />', () => {
  test('card initially renders with overview details', () => {
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
  });

  test('hours and reviews render on button click', async () => {
    const {
      debug,
      getByText,
      getByTestId,
      getAllByTestId,
      getAllByText
    } = render(
      <RestaurantCard index={mockIndex} restaurant={mockRestaurant} />
    );

    mockAxios.get.mockResolvedValueOnce(mockHours);
    mockAxios.get.mockResolvedValueOnce(mockReviews);

    // Assert that button text changes to "-" when clicked
    fireEvent.click(getByText('+'));
    expect(getByText('-')).toBeVisible;

    // Loading dots reappear while loading hours and reviews
    expect(getByTestId('loading-dots')).toBeTruthy;

    // Wait for details wrapper to appear
    await waitForElement(() => getByTestId('restaurant-details'));

    // Assert helper function has been called
    expect(mockGetOpenHours).toHaveBeenCalled;

    // Assert that either 'Open Now' or 'Closed' is visible
    expect(
      mockHours.data.hours[0].is_open_now
        ? getByText('Open Now')
        : getByText('Closed')
    ).toBeVisible;

    // Assert that all line items of restaurant hours match incoming data
    expect(getAllByTestId('restaurant-hours-item').length).toBe(
      mockHours.data.hours[0].open.length
    );

    // Assert that helper functions were called
    expect(mockFormatReviewDate).toHaveBeenCalled;
    expect(mockGetStars).toHaveBeenCalled;

    // Assert all user avatars are sourced from the correct URL
    expect(getAllByTestId('review-user-avatar').map(user => user.src)).toEqual(
      mockReviews.data.reviews.map(review => review.user.image_url)
    );

    // Assert all user names appear in the review header
    expect(
      getAllByTestId('review-user-name').map(user => user.textContent)
    ).toEqual(mockReviews.data.reviews.map(review => review.user.name));

    // Assert that all links to the full review have correct URL
    expect(getAllByText('Read full review').map(link => link.href)).toEqual(
      mockReviews.data.reviews.map(review => review.url)
    );

    // Finally, assert that details are hidden after button clicked again
    fireEvent.click(getByText('-'));
    expect(getByTestId('restaurant-details')).not.toBeVisible;
    //debug();
  });
});
