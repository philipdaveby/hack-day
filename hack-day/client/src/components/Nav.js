import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav>
      <Link to="/">
        <button>
          Create
        </button>
      </Link>
      <Link to="/workout">
        <button>
          Workout
        </button>
      </Link>
    </nav>
  );
};

export default Nav;
