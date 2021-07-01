import React from 'react';

const Workout = props => {
  return (
    <div>
      <h2>Here goes the name of the workout</h2>
      <ul>
        {props.workouts[0] ? props.workouts.map(obj => {
          return <li key={obj.id} onClick={e => props.toggleDone(e)}>
            <h2>{obj.title}</h2>
            <p>{obj.category}</p>
            </li>}) : ''
        }
      </ul>
    </div>
  );
}

export default Workout;
