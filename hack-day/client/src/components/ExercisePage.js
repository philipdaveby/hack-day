import React, { useEffect, useState } from 'react';

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

  const removeWorkout = e => {
    workouts.forEach((obj, i) => {
      if (obj.id.toString() === e.currentTarget.id) {
        workouts.splice(i, 1);
        setWorkouts(workouts);
        // console.log('Should be removed now');
        // Ta bort övningen
        // Isf vill jag inte gå vidare och push till array
      }
    });
  };

  const addWorkout = e => {
    exercises.forEach(exercise => {
      if (e.currentTarget.id !== exercise.id.toString()) {
        return;
      }
      // 
      const updatedWorkout = [...workouts, exercise]
      setWorkouts(updatedWorkout);
    });
  };

  const toggleWorkout = e => {
    // kolla om övningen finns

    const objExists = workouts.filter(exercise => exercise.id.toString() === e.currentTarget.id);
    // console.log(objExists[0]);
    if (objExists[0]) {
      removeWorkout(e);
      return;
    }

    // if (/*  */)

    addWorkout(e);
    
  // Lägger till övningen
  

  //   const i = workouts.length - 1;
  //   const updatedWorkout = workouts[i];

  //   if (workouts[i].exercises.length === 0) {
  //     console.log('Inside check for empty array')
  //     updatedWorkout.exercises.push(exercise);
  //     setWorkouts([...workouts, updatedWorkout]);
  //     return;
  //   } 

  //   workouts[i].exercises.forEach(exerciseObj => {

  //     // console.log('inside for each')
  //     // console.log(exerciseObj.id, ' - ', exercise.id)
  //     if (exerciseObj.id !== exercise.id) {
  //       // console.log('inside inner if')
  //       updatedWorkout.exercises.push(exercise);
  //       setWorkouts([...workouts, updatedWorkout]);
  //       return;
  //     } 
      
  //     console.log('Last')
  //     const index = workouts[i].exercises.findIndex(e => e.id === exerciseObj.id);
  //     // console.log(index)

  //     updatedWorkout.exercises.splice(index, 1);
  //     // console.log(updatedWorkout.exercises.splice(index, 1), ' console');
  //     // console.log(updatedWorkout, ' console updated')
  //     setWorkouts([...workouts, updatedWorkout]);
  //     else {
  //     }
  //   });
    






  //     workouts[i].exercises.map(workoutExercise => {
  //       if (workoutExercise.id === exercise.id) {
  //         // hitta index sen ta bort
  //         const index = workouts.findIndex(e => e.id === workoutExercise.id);

  //         console.log('Inside dubble if')
  //         return;
  //         // console.log(index)
  //         // workouts[i].exercises.splice(index, 1);
  //       } else {
  //         // console.log(workouts[i].exercises)
  //         updatedWorkout.exercises.push(exercise);
  //       }
  //       setWorkouts([...workouts, updatedWorkout]);

  //     });
  //     Kolla om workout finns
  //     console.log(workouts[i].exercises)
  
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
    toggleWorkout(e);
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
