import React, { useEffect, useState, useRef } from 'react';

const ExercisePage = props => {

  const listItems = useRef();
  const [exercises, setExercises] = useState('');
  const [filteredExercises, setFilteredExercises] = useState('');
  // const [workouts, setWorkouts] = useState([]);
  
  useEffect(() => {
    callApi()
      .then(res => setExercises(res))
      .then(res => setFilteredExercises(res))
      .catch(err => console.log(err));
  }, []);

  // useEffect(() => {
  //   // console.log(listItems.current.children);
  //   const liArray = Array.from(listItems.current.children);

  //   if (!exercises) {
  //     return;
  //   }

  //   exercises.map(exercise => {
  //     if (exercise.clicked) {
  //       const clickedLi = liArray.filter(li => li.id === exercise.id.toString());
  //       console.log(clickedLi);
  //       clickedLi.className = 'clicked'
  //       return;
  //     } 
  //     Array.from(listItems.current.children).map(li => {
  //       li.className = ''
  //     });
  //   });

  //   // exercise.clicked ? e.currentTarget.className = 'clicked' : e.currentTarget.className = '';
  // },);

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
    props.workouts.forEach((obj, i) => {
      if (obj.id.toString() === e.currentTarget.id) {
        props.workouts.splice(i, 1);
        props.setWorkouts(props.workouts);
      }
    });
  };

  const addWorkout = e => {
    exercises.forEach(exercise => {
      if (e.currentTarget.id !== exercise.id.toString()) {
        return;
      }
      const updatedWorkout = [...props.workouts, exercise]
      props.setWorkouts(updatedWorkout);
    });
  };

  const toggleWorkout = e => {
    const objExists = props.workouts.filter(exercise => exercise.id.toString() === e.currentTarget.id);
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

  const saveWorkout = () => {
    // Set title of workout
    // Send user to workout 
    // Add new workout
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
      <button onClick={saveWorkout}>Save workout</button>
          <ul ref={listItems}>{
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
