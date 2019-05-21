import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Title = styled.h1`
  text-align: center;
  font-family: 'Karla', sans-serif;
`;

const Header = () => (
  <header>
    <Link to="/">
      <Title>Chow Now</Title>
    </Link>
  </header>
);

export default Header;
