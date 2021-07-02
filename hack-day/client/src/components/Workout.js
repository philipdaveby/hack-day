import React from 'react';

const Workout = props => {

  const toggleDone = e => {
    e.stopPropagation();

    
    props.setWorkouts(props.workouts.map(workout => {
      if (workout.id.toString() === e.currentTarget.parentNode.parentNode.parentNode.id) {
        workout.workout.map(exercise => {
          if (e.currentTarget.id === exercise.id.toString()) {
            exercise.done ? exercise.done = false : exercise.done = true;
            return exercise;
          } 
          return exercise;
        });
      }
      return workout;
    }));
  };
  const deleteWorkout = e => {
    const index = props.workouts.findIndex(workout => workout.id.toString() === e.currentTarget.parentNode.parentNode.parentNode.id);
    props.workouts.splice(index, 1);
    window.localStorage.setItem('workouts', JSON.stringify(props.workouts))
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
        <button id={props.workout.id} className="workouts__button-delete" onClick={e => deleteWorkout(e)}>DELETE</button>
      </ul>
    </div>
  );
}

export default Workout;
