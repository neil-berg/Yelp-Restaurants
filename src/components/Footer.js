import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import yelpLogo from '../assets/yelp-icons/Yelp_trademark_RGB.png';

const StyledFooter = styled.footer`
  height: 285px;
  background: linear-gradient(135deg, var(--red), var(--orange));
  display: flex;
  flex-direction: column;
  align-items: center;

  .footer__yelp-credit,
  .footer__map-credit,
  .footer__icon-credit {
    color: white;
    text-align: center;
  }

  .footer__yelp-icon {
    width: 225px;
    height: auto;
  }

  .footer__map-credit {
    margin: 0;
  }

  .footer__yelp-link,
  .footer__map-link,
  .footer__icon-link {
    text-decoration: underline;
  }
`;
const Footer = ({ handleOutsideClick }) => (
  <StyledFooter className="footer" onClick={handleOutsideClick}>
    <img className="footer__yelp-icon" src={yelpLogo} alt="logo" />
    <p className="footer__yelp-credit">
      Data provided by the{' '}
      <a
        className="footer__yelp-link"
        href="https://www.yelp.com/fusion"
        target="_blank"
        rel="noopener noreferrer"
      >
        Yelp Fusion API
      </a>
    </p>

    <p className="footer__map-credit">
      Map markers by{' '}
      <a
        className="footer__map-link"
        href="https://mapicons.mapsmarker.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Maps Icons Collection
      </a>
    </p>
    <p className="footer__icon-credit">
      Icons made by{' '}
      <a
        className="footer__icon-link"
        href="https://www.freepik.com/"
        target="_blank"
        rel="noopener noreferrer"
        title="Freepik"
      >
        Freepik
      </a>{' '}
      from{' '}
      <a
        className="footer__icon-link"
        href="https://www.flaticon.com/"
        target="_blank"
        rel="noopener noreferrer"
        title="Flaticon"
      >
        www.flaticon.com
      </a>{' '}
      is licensed by{' '}
      <a
        className="footer__icon-link"
        href="http://creativecommons.org/licenses/by/3.0/"
        target="_blank"
        rel="noopener noreferrer"
        title="Creative Commons BY 3.0"
      >
        CC 3.0 BY
      </a>
    </p>
  </StyledFooter>
);

Footer.propTypes = {
  handleOutsideClick: PropTypes.func.isRequired
};

export default Footer;
