import React from 'react';
import { Link } from 'react-router-dom';
import homeIcon from '../icons/home.png';
import workoutsIcon from '../icons/workouts.png';
import profileIcon from '../icons/profile.png';

const Nav = () => {

  return (
    <nav className="nav">
      <Link to="/">
        <div className="nav__button">
          <img src={homeIcon} alt="Home icon" className="nav__icon"/> 
        </div>
      </Link>
      <Link to="/workouts">
        <div className="nav__button">
          <img src={workoutsIcon} alt="Workouts icon" className="nav__icon"/> 
        </div>
      </Link>
      <Link to="/profile">
        <div className="nav__button">
          <img src={profileIcon} alt="Profile icon" className="nav__icon"/> 
        </div>
      </Link>
    </nav>
  );
};

export default Nav;
