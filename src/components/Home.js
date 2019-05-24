import React from 'react';
import styled from 'styled-components';

import { ReactComponent as SushiSVG } from '../assets/sushi.svg';
import { ReactComponent as TacosSVG } from '../assets/taco.svg';
import { ReactComponent as PizzaSVG } from '../assets/pizza.svg';
import { ReactComponent as PastaSVG } from '../assets/pasta.svg';
import { ReactComponent as ThaiSVG } from '../assets/curry.svg';
import { ReactComponent as AmericanSVG } from '../assets/burger.svg';
import { ReactComponent as MediSVG } from '../assets/pita.svg';
import { ReactComponent as FrenchSVG } from '../assets/chicken.svg';
import { ReactComponent as BbqSVG } from '../assets/ribs.svg';
import { ReactComponent as VeganSVG } from '../assets/vegetables.svg';
import { ReactComponent as WafflesSVG } from '../assets/waffle.svg';
import { ReactComponent as DessertSVG } from '../assets/dessert.svg';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 200px);
  grid-gap: 1em;
  justify-content: center;
  margin: 1rem 0;

  .option {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 200px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    svg {
      width: 180px;
      height: 180px;
      margin: 1rem;
    }

    .name {
      padding: 1rem;
      text-align: center;
      font-size: 1.5em;
    }
  }

  @media (hover: hover) {
    .option:hover {
      background: var(--red);

      .name {
        color: white;
      }
    }
  }
`;

const Home = ({ setInputFood, handleOutsideClick }) => {
  const options = {
    sushi: <SushiSVG />,
    tacos: <TacosSVG />,
    pizza: <PizzaSVG />,
    pasta: <PastaSVG />,
    thai: <ThaiSVG />,
    american: <AmericanSVG />,
    mediterranean: <MediSVG />,
    french: <FrenchSVG />,
    bbq: <BbqSVG />,
    vegan: <VeganSVG />,
    waffles: <WafflesSVG />,
    dessert: <DessertSVG />
  };

  const renderOptionList = Object.keys(options).map((option, i) => {
    const uppercaseOption =
      option === 'bbq'
        ? option.toUpperCase()
        : option.slice(0, 1).toUpperCase() + option.slice(1);
    return (
      <div
        key={i}
        className="option"
        onClick={() => setInputFood(uppercaseOption)}
      >
        {options[option]}
        <span className="name">{uppercaseOption}</span>
      </div>
    );
  });

  return <Container onClick={handleOutsideClick}>{renderOptionList}</Container>;
};

export default Home;
