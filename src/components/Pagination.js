import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';

const PageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem;

  .page-container__page--selected,
  .page-container__page--unselected {
    width: 35px;
    height: 35px;
    margin: 0.5rem;
    border: 1px lightgrey solid;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .page-container__page--selected {
    background: var(--red);
  }

  .page-container__link {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
  }

  .page-container__page--selected .page-container__link {
    color: white;
  }
`;

const Pagination = ({ location }) => {
  const page = Number(location.pathname.slice(-1));
  const renderPages = [...new Array(5).keys()].map(number => {
    const slug = location.pathname.replace(/page=\d/, `page=${number + 1}`);
    return (
      <div
        key={number}
        className={`page-container__page--${
          number + 1 === page ? 'selected' : 'unselected'
        }`}
      >
        <Link to={slug} className="page-container__link">
          {number + 1}
        </Link>
      </div>
    );
  });
  return <PageWrapper className="page-container">{renderPages}</PageWrapper>;
};

Pagination.propTypes = {
  location: PropTypes.shape({
    hash: PropTypes.string,
    key: PropTypes.string,
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string
  })
};

export default withRouter(Pagination);
