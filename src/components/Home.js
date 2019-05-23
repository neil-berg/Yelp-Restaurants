import React from 'react';

import { ReactComponent as Logo } from '../assets/cupcake.svg';

const Home = ({ handleOutsideClick }) => (
  <div onClick={handleOutsideClick}>
    <Logo />
  </div>
);

export default Home;
