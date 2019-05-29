import React from 'react';
import styled from 'styled-components';
import { animated, useSprings } from 'react-spring';

import { ReactComponent as SushiSVG } from '../assets/food-icons/sushi.svg';
import { ReactComponent as TacosSVG } from '../assets/food-icons/taco.svg';
import { ReactComponent as PizzaSVG } from '../assets/food-icons/pizza.svg';
import { ReactComponent as PastaSVG } from '../assets/food-icons/pasta.svg';
import { ReactComponent as ThaiSVG } from '../assets/food-icons/curry.svg';
import { ReactComponent as AmericanSVG } from '../assets/food-icons/burger.svg';
import { ReactComponent as MediSVG } from '../assets/food-icons/pita.svg';
import { ReactComponent as FrenchSVG } from '../assets/food-icons/chicken.svg';
import { ReactComponent as BbqSVG } from '../assets/food-icons/ribs.svg';
import { ReactComponent as VeganSVG } from '../assets/food-icons/vegetables.svg';
import { ReactComponent as WafflesSVG } from '../assets/food-icons/waffle.svg';
import { ReactComponent as DessertSVG } from '../assets/food-icons/dessert.svg';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 160px);
  grid-gap: 1em;
  justify-content: center;
  margin: 1rem 0;

  .option {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 160px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    svg {
      width: 120px;
      height: 120px;
      margin: 1rem;
    }

    .name {
      padding: 1rem;
      text-align: center;
      font-size: 1.5em;
    }
  }

  @media screen and (min-width: 500px) {
    grid-template-columns: repeat(auto-fit, 200px);
    .option {
      width: 200px;

      svg {
        width: 180px;
        height: 180x;
      }
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

  const [springs] = useSprings(Object.keys(options).length, i => ({
    to: { opacity: 1 },
    from: { opacity: 0 },
    delay: `${i * 50}`,
    config: { friction: 100 }
  }));

  const renderOptionList = Object.keys(options).map((option, i) => {
    const uppercaseOption =
      option === 'bbq'
        ? option.toUpperCase()
        : option.slice(0, 1).toUpperCase() + option.slice(1);
    return (
      <animated.div
        key={i}
        className="option"
        onClick={() => setInputFood(uppercaseOption)}
        style={springs[i]}
      >
        {options[option]}
        <span className="name">{uppercaseOption}</span>
      </animated.div>
    );
  });

  return <Container onClick={handleOutsideClick}>{renderOptionList}</Container>;
};

export default Home;
