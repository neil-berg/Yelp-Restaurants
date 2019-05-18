import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <Link to="/">
      <h1 style={{ textAlign: 'center' }}>Chow Now</h1>
    </Link>
  </header>
);

export default Header;
