import React from 'react';
import Workout from './Workout';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const Workouts = props => {

  const [activeWorkout, setActiveWorkout] = useState(null);

  return (
    <div>
      <h2>Your workouts</h2>
      <ul>{props.workouts.map((workout, index) => {
        return <li key={workout.id} onClick={e => setActiveWorkout( (activeWorkout === workout.id) ? null : workout.id)} className="workouts__li">
           <h2> <a>{workout.title}</a></h2>
           {(activeWorkout === workout.id) ? <Workout workout={workout.workout} /> : ''}
          </li>
      })}</ul>
    </div>
  );
}

export default Workouts;
