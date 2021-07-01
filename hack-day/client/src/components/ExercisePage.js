import React, { useEffect, useState } from 'react';

const ExercisePage = () => {

  const [exercises, setExercises] = useState('');
  const [filteredExercises, setFilteredExercises] = useState('');
  
  useEffect(() => {
    callApi()
      .then(res => setExercises(res))
      .then(res => setFilteredExercises(res))
      .catch(err => console.log(err));
  }, []);

  // useEffect(() => {
  //   exercises ? exercises.map(e => console.log(e.clicked)) : console.log();
  //   // console.log(exercises);
  // });
  
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

  const toggleChooseExercise = e => {

    let className = e.currentTarget.className
    setExercises(exercises.map(exercise => {
      if (e.currentTarget.id === exercise.id) {
        exercise.clicked ? exercise.clicked = false : exercise.clicked = true;
        return exercise;
      }
      return exercise;
      // exercise.clicked ? className = 'clicked' : className = '';
    }));
    console.log(exercises[0])

    // if (chooseClass === 'marked') {
    //   chooseClass = ''
    // }
    // chooseClass = 'marked';



    console.log(e.currentTarget.id)
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
