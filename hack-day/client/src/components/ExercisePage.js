import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const ExercisePage = props => {

  const [exercises, setExercises] = props.useStickyState(null, 'exercises');
  const history = useHistory();
  
  useEffect(() => {
    callApi()
      .then(res => setExercises(res))
      .catch(err => console.log(err));
  }, []);
  
  const callApi = async () => {
    const response = await fetch('/api/exercises');
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  const filterExercises = query => {
    setExercises(exercises.map(exercise => {
      if (exercise.title.match(query) || exercise.category.match(query)) {
        exercise.isFilteredOut = false;
        return exercise;
      }
        exercise.isFilteredOut = true;
        return exercise;
   }))
  };

  const removeWorkout = e => {
    props.workout.forEach((obj, i) => {
      if (obj.id.toString() === e.currentTarget.id) {
        props.workout.splice(i, 1);
        props.setWorkout(props.workout);
      }
    });
  };

  const addWorkout = e => {
    exercises.forEach(exercise => {
      if (e.currentTarget.id !== exercise.id.toString()) {
        return;
      }
      const updatedWorkout = [...props.workout, exercise]
      props.setWorkout(updatedWorkout);
    });
  };

  const toggleWorkout = e => {
    const objExists = props.workout.filter(exercise => exercise.id.toString() === e.currentTarget.id);
    if (objExists[0]) {
      removeWorkout(e);
      return;
    }
    addWorkout(e);
  };

  const toggleChooseExercise = e => {
    setExercises(exercises.map(exercise => {
      if (e.currentTarget.id === exercise.id.toString()) {
        exercise.clicked ? exercise.clicked = false : exercise.clicked = true;
        exercise.clicked ? e.currentTarget.className = 'exercise-page__li clicked' : e.currentTarget.className = 'exercise-page__li';
      }
      return exercise;
    }));
    toggleWorkout(e);
  };

  const saveWorkout = e => {
    e.preventDefault();
    const length = props.workouts.length;
    const updatedObject = {
      title: e.target.title.value,
      workout: props.workout,
      id: length,
      done: false
    }
    props.setWorkouts([...props.workouts, updatedObject]);
    e.target.title.value = '';

    props.setWorkout([]);
    history.push('/workouts');
  };

  return (
    <div className="exercise-page">
      <h2 className="exercise-page__header">Create your workout</h2>
          <ul className="exercise-page__list">{
          exercises ? exercises.map(exercise => {
            return !exercise.isFilteredOut ? (<li key={exercise.id} id={exercise.id} onClick={e => toggleChooseExercise(e)} className="exercise-page__li">
              <h3>{exercise.title}</h3>
              {exercise.category}
              </li>) : ''
          }) : ''
          }</ul>
      <div className="exercise-page__forms">
        <form className="exercise-page__save" onSubmit={e => saveWorkout(e)}>
          <input
            name="title"
            type="text"
            placeholder="Enter a title"
            />
            <button type="submit">SAVE</button>
        </form>
        <form className="exercise-page__search">
          <input
            type="text"
            onChange={e => filterExercises(e.target.value)}
            placeholder="Search.."
            />
          <button type="submit">SEARCH</button>
        </form>
      </div>
    </div>
  );  

};

export default ExercisePage;
