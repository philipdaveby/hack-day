import React from 'react';
import Workout from './Workout';

const Workouts = props => {
  const workouts = props.workouts;
  workouts[0] ? workouts.forEach(e => console.log(e.title)) : console.log('');

  const toggleDone = e => {
    if (e.currentTarget.className === 'done') {
      e.currentTarget.className = '';
      return;
    } 
      e.currentTarget.className = 'done';
  }

  return (
    <div>
      <h2>Your workout</h2>
      <Workout workouts={workouts} toggleDone={toggleDone}/>
    </div>
  );
}

export default Workouts;
