import React from 'react';
import Workout from './Workout';

const Workouts = props => {

  const [activeWorkout, setActiveWorkout] = props.useStickyState(null);

  return (
    <div>
      <h2>Your workouts</h2>
      <ul>{props.workouts.map((workout, index) => {
        return <li key={workout.id} id={workout.id} onClick={e => setActiveWorkout( (activeWorkout === workout.id) ? null : workout.id)} className="workouts__li">
           <h2>{workout.title}</h2>
           {(activeWorkout === workout.id) ? <Workout workout={workout.workout} workouts={props.workouts} setWorkouts={props.setWorkouts} /> : ''}
          </li>
      })}</ul>
    </div>
  );
}

export default Workouts;
