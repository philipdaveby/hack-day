import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const ExercisePage = props => {

  // const listItems = useRef();
  const [exercises, setExercises] = useState('');
  const [filteredExercises, setFilteredExercises] = useState('');
  const history = useHistory();
  
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
  //   if (exercises) {
  //     exercises.forEach(e => console.log(e.isFilteredOut))
  //   }
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
  //   // if (filteredExercises === []) {
  //   //   setFilteredExercises(exercises);
  //   // }
  //   const filteredTitle = exercises.filter(exercise => exercise.title.match(query));
  //   setFilteredExercises(filteredTitle);
  // };

  const filterExercises = query => {
    const filteredTitle = exercises.filter(exercise => exercise.title.match(query));
    setExercises(exercises.map(exercise => {
      if (exercise.title.match(query)) {
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
        exercise.clicked ? e.currentTarget.className = 'clicked' : e.currentTarget.className = '';
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
      id: length
    }
    props.setWorkouts([...props.workouts, updatedObject]);
    e.target.title.value = '';

    props.setWorkout([]);
    history.push('/workouts');
  };

  return (
    <div className="exercise__page">
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
      {/* <button onClick={saveWorkout}>Save workout</button> */}
      <form onSubmit={e => saveWorkout(e)}>
        <input
          name="title"
          type="text"
          placeholder="Enter a title"
          />
        {/* <Link to="/workouts"> */}
          <button type="submit" >Save workout</button>
        {/* </Link> */}
      </form>
          <ul>{
          // filteredExercises ? filteredExercises.map(exercise => {
          //   return <li key={exercise.id} onClick={e => toggleChooseExercise(e)}>
          //     <h3>{exercise.title}</h3>
          //     {exercise.category}
          //     </li>
          // }) : 
          exercises ? exercises.map(exercise => {
            return !exercise.isFilteredOut ? (<li key={exercise.id} id={exercise.id} onClick={e => toggleChooseExercise(e)}>
              <h3>{exercise.title}</h3>
              {exercise.category}
              </li>) : ''
          }) : ''
          }</ul>
    </div>
  );  

};

export default ExercisePage;
