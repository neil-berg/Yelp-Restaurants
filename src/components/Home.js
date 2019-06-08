import React from 'react';
import PropTypes from 'prop-types';
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

const HomeWrapper = styled.div`
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
  }

  .option__icon {
    width: 120px;
    height: 120px;
    margin: 1rem;
  }

  .option__name {
    padding: 1rem;
    text-align: center;
    font-size: 1.5em;
  }

  @media screen and (min-width: 500px) {
    grid-template-columns: repeat(auto-fit, 200px);
    .option {
      width: 200px;
    }

    .option__icon {
      width: 180px;
      height: 180x;
    }
  }
  @media (hover: hover) {
    .option:hover {
      background: var(--red);
    }
    .option:hover .option__name {
      color: white;
    }
  }
`;

const Home = ({ setInputFood, handleOutsideClick }) => {
  const options = {
    sushi: <SushiSVG className="option__icon" />,
    tacos: <TacosSVG className="option__icon" />,
    pizza: <PizzaSVG className="option__icon" />,
    pasta: <PastaSVG className="option__icon" />,
    thai: <ThaiSVG className="option__icon" />,
    american: <AmericanSVG className="option__icon" />,
    mediterranean: <MediSVG className="option__icon" />,
    french: <FrenchSVG className="option__icon" />,
    bbq: <BbqSVG className="option__icon" />,
    vegan: <VeganSVG className="option__icon" />,
    waffles: <WafflesSVG className="option__icon" />,
    dessert: <DessertSVG className="option__icon" />
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
        <span className="option__name">{uppercaseOption}</span>
      </animated.div>
    );
  });

  return (
    <HomeWrapper onClick={handleOutsideClick}>{renderOptionList}</HomeWrapper>
  );
};

Home.propTypes = {
  setInputFood: PropTypes.func.isRequired,
  handleOutsideClick: PropTypes.func.isRequired
};

export default Home;
