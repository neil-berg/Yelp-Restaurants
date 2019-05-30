import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';

const PageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem;

  .link-container {
    width: 35px;
    height: 35px;
    margin: 0.5rem;
    border: 1px lightgrey solid;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    .link {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 100%;
    }
  }

  .link-container.selected {
    background: var(--red);

    .link {
      color: white;
    }
  }
`;

const Pagination = ({ location }) => {
  const page = Number(location.pathname.slice(-1));
  const renderPages = [...new Array(5).keys()].map(number => {
    const slug = location.pathname.replace(/page=\d/, `page=${number + 1}`);
    return (
      <div
        key={number}
        className={`link-container ${number + 1 === page ? 'selected' : null}`}
      >
        <Link to={slug} className="link">
          {number + 1}
        </Link>
      </div>
    );
  });
  return <PageWrapper>{renderPages}</PageWrapper>;
};

export default withRouter(Pagination);
