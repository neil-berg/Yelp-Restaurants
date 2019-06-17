import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import mockAxios from 'axios';
import RestaurantCard from '../components/RestaurantCard';

afterEach(cleanup);

const mockIndex = 1;
const mockRestuarant = {
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

const mockHours = {
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
};

const mockReviews = [
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
];
