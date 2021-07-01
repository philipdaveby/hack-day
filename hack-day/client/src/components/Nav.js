import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav>
      <Link to="/">
        <button>
          Home
        </button>
      </Link>
      <Link to="/workouts">
        <button>
          Workout
        </button>
      </Link>
    </nav>
  );
};

export default Nav;
