import React, { useState } from 'react';
import styled from 'styled-components';

const Input = styled.input`
  width: 400px;
`;

const SearchBar = ({ setPosition, setTerm }) => {
  const [inputText, setInputText] = useState('');

  const handleClick = e => {
    e.preventDefault();
    navigator.geolocation.getCurrentPosition(position =>
      setPosition(position.coords)
    );
    setTerm(inputText);
  };

  return (
    <div className="search">
      <form className="search__form">
        <Input
          className="search__input"
          type="text"
          placeholder="What are you in the mood for?"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
        />
        <button
          className="search__button"
          type="submit"
          onClick={e => handleClick(e)}
        >
          Find spots near me
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
