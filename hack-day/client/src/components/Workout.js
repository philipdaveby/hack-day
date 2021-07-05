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

  const restart = e => {
    e.stopPropagation();

    props.setWorkouts(props.workouts.map(exercises => {
      if (exercises.id.toString() === e.currentTarget.parentNode.parentNode.parentNode.parentNode.id) {
        exercises.workout.map(exercise => {
          exercise.done = false;
          return exercise;
        });
      }
      return exercises;
    }));
  }

  return (
    <div>
      <ul className="workout__list">
        {props.workout[0] ? props.workout.map(obj => {
          return <li key={obj.id} id={obj.id} onClick={e => toggleDone(e)} className={obj.done ? "workouts__exercise done" : "workouts__exercise"}>
            <h2>{obj.title}</h2>
            <p>{obj.category}</p>
            </li>}) : ''
        }
        <div className="workouts__buttons">
          <button id={props.workout.id} className="workouts__button-delete" onClick={e => deleteWorkout(e)}>DELETE</button>
          <button id={props.workout.id} className="workouts__button-restart" onClick={e => restart(e)}>RESTART</button>
        </div>
      </ul>
    </div>
  );
}

export default Workout;
