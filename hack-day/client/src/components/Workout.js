import React from 'react';

const Workout = props => {

  const toggleDone = e => {
    e.stopPropagation();
    
    props.setWorkout(props.workout.map(exercise => {
      if (e.currentTarget.id === exercise.id.toString()) {
        exercise.done ? exercise.done = false : exercise.done = true;
        return exercise;
      } 
      return exercise;
    }));
  };

  return (
    <div>
      <ul className="workouts__list">
        {props.workout[0] ? props.workout.map(obj => {
          return <li key={obj.id} id={obj.id} onClick={e => toggleDone(e)} className={obj.done ? "workouts__exercise done" : "workouts__exercise"}>
            <h2>{obj.title}</h2>
            <p>{obj.category}</p>
            </li>}) : ''
        }
      </ul>
    </div>
  );
}

export default Workout;
