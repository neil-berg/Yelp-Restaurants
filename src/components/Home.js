import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
  width: 100px;
  height: 100px;
  background: blue;
`;

const Home = () => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, 100px)',
        gridGap: '1rem'
      }}
    >
      <Box className="box">1</Box>
      <Box className="box">1</Box>
      <Box className="box">1</Box>
      <Box className="box">1</Box>
      <Box className="box">1</Box>
      <Box className="box">1</Box>
      <Box className="box">1</Box>
      <Box className="box">1</Box>
      <Box className="box">1</Box>
      <Box className="box">1</Box>
      <Box className="box">1</Box>
      <Box className="box">1</Box>
      <Box className="box">1</Box>
      <Box className="box">1</Box>
      <Box className="box">1</Box>
    </div>
  );
};

export default Home;
