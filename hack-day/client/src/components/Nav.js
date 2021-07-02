import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="nav">
      <Link to="/">
        <div className="nav__button">
          HOME
        </div>
      </Link>
      <Link to="/workouts">
        <div className="nav__button">
          WORKOUT
        </div>
      </Link>
    </nav>
  );
};

export default Nav;
