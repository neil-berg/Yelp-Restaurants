import React from 'react';
import styled from 'styled-components';

import yelpLogo from '../assets/Yelp_trademark_RGB.png';

const StyledFooter = styled.footer`
  height: 250px;
  background: linear-gradient(135deg, var(--red), var(--orange));
  display: flex;
  flex-direction: column;
  align-items: center;

  .yelp-credit,
  .icon-credit {
    color: white;
    text-align: center;
  }
  .yelp-credit img {
    width: 225px;
    height: auto;
  }
`;
const Footer = () => (
  <StyledFooter>
    <div className="yelp-credit">
      <img src={yelpLogo} alt="logo" />
      <p>
        Data provided by the{' '}
        <a
          href="https://www.yelp.com/fusion"
          style={{ textDecoration: 'underline' }}
        >
          Yelp Fusion API
        </a>
      </p>
    </div>
    <div className="icon-credit">
      Icons made by{' '}
      <a
        href="https://www.freepik.com/"
        target="_blank"
        rel="noopener noreferrer"
        title="Freepik"
      >
        Freepik
      </a>{' '}
      from{' '}
      <a
        href="https://www.flaticon.com/"
        target="_blank"
        rel="noopener noreferrer"
        title="Flaticon"
        style={{ textDecoration: 'underline' }}
      >
        www.flaticon.com
      </a>{' '}
      is licensed by{' '}
      <a
        href="http://creativecommons.org/licenses/by/3.0/"
        target="_blank"
        rel="noopener noreferrer"
        title="Creative Commons BY 3.0"
      >
        CC 3.0 BY
      </a>
    </div>
  </StyledFooter>
);

export default Footer;
