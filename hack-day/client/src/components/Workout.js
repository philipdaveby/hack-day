import React from 'react';

const Workout = props => {

  const toggleDone = e => {
    if (e.currentTarget.className === 'workouts__exercise done') {
      e.currentTarget.className = 'workouts__exercise';
      return;
    } 
      e.currentTarget.className = 'workouts__exercise done';
  }

  return (
    <div>
      <ul className="workouts__list">
        {props.workout[0] ? props.workout.map(obj => {
          return <li key={obj.id} onClick={e => {
            e.stopPropagation();
            toggleDone(e);
          }} className="workouts__exercise">
            <h2>{obj.title}</h2>
            <p>{obj.category}</p>
            </li>}) : ''
        }
      </ul>
    </div>
  );
}

export default Workout;
