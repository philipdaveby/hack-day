import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const ExercisePage = props => {

  const [exercises, setExercises] = props.useStickyState(null, 'exercises');
  const [displayAddExercise, setDisplayAddExercise] = useState(false);
  const history = useHistory();
  
  useEffect(() => {
    callApi()
    .then(res => setExercises(res))
    .catch(err => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const callApi = async () => {
    const response = await fetch('https://hack-day-backend.herokuapp.com/api/exercises');
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };


  const filterExercises = query => {
    setExercises(exercises.map(exercise => {
      if (exercise.title.toLowerCase().match(query.toLowerCase()) || exercise.category.toLowerCase().match(query.toLowerCase())) {
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

  const saveWorkout = async e => {
    e.preventDefault();
    const updatedObject = {
      title: e.target.title.value,
      workout: props.workout
    }

    props.setWorkouts([...props.workouts, updatedObject]);
    e.target.title.value = '';

    props.setWorkout([]);

    await fetch('/api/workout', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedObject)
    }).then(res => {
    }).catch(err => console.log(err));

    history.push('/workouts');
  };

  const newExercise = () => {
    displayAddExercise ? setDisplayAddExercise(false) : setDisplayAddExercise(true);
    setTimeout(() => window.scrollBy(0, 100), 100)
  }

  const sendNewExercise = async exerciseObject => {
    await fetch('/api/exercise', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(exerciseObject)
    }).then(res => {
    }).catch(err => console.log(err));
  };

  const addExercise = e => {
    e.preventDefault();

    if (!e.target.exercise__title.value || !e.target.exercise__category.value) {
      return;
    }
    const newExercise = {
      title: e.target.exercise__title.value,
		  category: e.target.exercise__category.value.toLowerCase(),
		  id: exercises.length,
		  clicked: false
    };
    sendNewExercise(newExercise);
    callApi()
    .then(res => setExercises(res))
    .catch(err => console.log(err));

    setDisplayAddExercise(false);
  }

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
          <div className="exercise-page__new-exercise">
            <button className="exercise-page__new-button" onClick={newExercise}>NEW EXERCISE</button>
            {displayAddExercise ? 
              <form className="new-exercise__add" onSubmit={e => addExercise(e)}>
                <section className="new-exercise__input">
                  <input
                    name="exercise__title"
                    type="text"
                    placeholder="Enter a title"
                    />
                    <input
                    name="exercise__category"
                    type="text"
                    placeholder="Enter a category"
                    />
                </section>
                <button type="submit">SAVE</button>
            </form>
          : ''}
        </div>
      <div className="exercise-page__forms">
        <form className="exercise-page__save" onSubmit={e => saveWorkout(e)}>
          <input
            name="title"
            type="text"
            placeholder="Enter a title"
            className="exercise-page__input"
            />
            <button type="submit">SAVE</button>
        </form>
        <form className="exercise-page__search">
          <input
            type="text"
            onChange={e => filterExercises(e.target.value)}
            placeholder="Search.."
            className="exercise-page__input"
            />
          <button type="submit">SEARCH</button>
        </form>
      </div>
    </div>
  );  

};

export default ExercisePage;
