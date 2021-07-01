import React, { useEffect, useState } from 'react';
import Workouts from './Workouts';

const ExercisePage = () => {

  const [exercises, setExercises] = useState('');
  const [filteredExercises, setFilteredExercises] = useState('');
  const [workouts, setWorkouts] = useState([]);
  
  useEffect(() => {
    callApi()
      .then(res => setExercises(res))
      .then(res => setFilteredExercises(res))
      .catch(err => console.log(err));
  }, []);

  // useEffect(() => {
  //   console.log(workouts);
  // });
  
  const callApi = async () => {
    const response = await fetch('/api/exercises');
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  // const filterExercises = query => {
  //   if (filteredExercises === []) {
  //     setFilteredExercises(exercises);
  //   }
  //   const filteredTitle = exercises.filter(exercise => exercise.title.match(query));
  //   setFilteredExercises(filteredTitle);
  // };

  const removeWorkout = e => {
    workouts.forEach((obj, i) => {
      if (obj.id.toString() === e.currentTarget.id) {
        workouts.splice(i, 1);
        setWorkouts(workouts);
      }
    });
  };

  const addWorkout = e => {
    exercises.forEach(exercise => {
      if (e.currentTarget.id !== exercise.id.toString()) {
        return;
      }
      const updatedWorkout = [...workouts, exercise]
      setWorkouts(updatedWorkout);
    });
  };

  const toggleWorkout = e => {
    const objExists = workouts.filter(exercise => exercise.id.toString() === e.currentTarget.id);
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
        exercise.clicked ? e.currentTarget.className = 'clicked' : e.currentTarget.className = '';
      }
      return exercise;
    }));
    toggleWorkout(e);
  };

  return (
    <div className="exercise__page">
      <h2>Create your workout</h2>
      {/* <form>
        <p>
          <strong>Search</strong>
        </p>
        <input
          type="text"
          onChange={e => filterExercises(e.target.value)}
          />
        <button type="submit">Submit</button>
      </form> */}
      {/* <ul>
        {workouts ? workouts[0].exercises.map((e, i) => {
          return <li key={i+1000}>{e.title} {e.clicked} {e.id} </li>
        }) : ''}
      </ul> */}
          <ul>{
          filteredExercises ? filteredExercises.map(exercise => {
            return <li key={exercise.id} onClick={e => toggleChooseExercise(e)}>
              <h3>{exercise.title}</h3>
              {exercise.category}
              </li>
          }) : exercises ? exercises.map(exercise => {
            return <li key={exercise.id} id={exercise.id} onClick={e => toggleChooseExercise(e)}>
              <h3>{exercise.title}</h3>
              {exercise.category}
              </li>
          }) : ''
          }</ul>
    </div>
  );  

};

export default ExercisePage;
