import React, { useEffect, useState } from 'react';

const ExercisePage = () => {

  const [exercises, setExercises] = useState('');
  const [filteredExercises, setFilteredExercises] = useState('');
  const [workouts, setWorkouts] = useState([{title: 'Work in progress', exercises: []}]);
  
  useEffect(() => {
    callApi()
      .then(res => setExercises(res))
      .then(res => setFilteredExercises(res))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    // exercises ? exercises.map(e => console.log(e.clicked)) : console.log();
    console.log(workouts);
  });
  
  const callApi = async () => {
    const response = await fetch('/api/exercises');
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  const filterExercises = query => {
    if (filteredExercises === []) {
      setFilteredExercises(exercises);
    }
    const filteredTitle = exercises.filter(exercise => exercise.title.match(query));
    // const filteredCategory = exercises.filter(exercise => exercise.category.match(query));
    // const matches = [...filteredTitle, ...filteredCategory];
    setFilteredExercises(filteredTitle);
  };

  const addExerciseToWorkout = (e) => {
    exercises.map(exercise => {
      if (e.currentTarget.id !== exercise.id.toString()) {
        return;
      }
      const i = workouts.length - 1;
      const updatedWorkout = workouts[i];

      if (workouts[i].exercises.length === 0) {
        console.log('Inside check for empty array')
        updatedWorkout.exercises.push(exercise);
        setWorkouts([...workouts, updatedWorkout]);
        return;
      } 

      workouts[i].exercises.forEach(exerciseObj => {
        console.log(exerciseObj.id, ' - ', exercise.id)
        if (exerciseObj.id !== exercise.id) {
          console.log('inside inner if')
          updatedWorkout.exercises.push(exercise);
          setWorkouts([...workouts, updatedWorkout]);
        } 
        // else {
        //   const index = workouts[i].exercises.findIndex(e => e.id === exerciseObj.id);
        //   updatedWorkout.exercises.splice(index, 1);
        //   setWorkouts([...workouts, updatedWorkout]);
        // }
      });
      






        // workouts[i].exercises.map(workoutExercise => {
        //   if (workoutExercise.id === exercise.id) {
        //     // hitta index sen ta bort
        //     const index = workouts.findIndex(e => e.id === workoutExercise.id);

        //     console.log('Inside dubble if')
        //     return;
        //     // console.log(index)
        //     // workouts[i].exercises.splice(index, 1);
        //   } else {
        //     // console.log(workouts[i].exercises)
        //     updatedWorkout.exercises.push(exercise);
        //   }
        //   setWorkouts([...workouts, updatedWorkout]);

        // });
        // Kolla om workout finns
        // console.log(workouts[i].exercises)
      }
    );
  };

  const toggleChooseExercise = e => {
    setExercises(exercises.map(exercise => {
      if (e.currentTarget.id === exercise.id.toString()) {
        exercise.clicked ? exercise.clicked = false : exercise.clicked = true;
        exercise.clicked ? e.currentTarget.className = 'clicked' : e.currentTarget.className = '';
      }
      return exercise;
    }));
    // lägg till exercise i workout
    addExerciseToWorkout(e);
  };

  return (
    <div className="exercise__page">
      <h1>Workout app</h1>
      <h2>Create your workout</h2>
      <form>
        <p>
          <strong>Search</strong>
        </p>
        <input
          type="text"
          onChange={e => filterExercises(e.target.value)}
          />
        <button type="submit">Submit</button>
      </form>
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
