import React from 'react';

const Workouts = props => {
  // props.exercises.forEach(obj => console.log(obj))
  const workouts = props.workouts;
  workouts[0] ? workouts.forEach(e => console.log(e.title)) : console.log('');

  return (
    <div>
      <h2>Create your workout</h2>
      <p>These are all my workouts</p>
      {/* <p>{workouts[0] ? props.workouts[0].title : ''}</p> */}
      <ul>
        {workouts[0] ? workouts.map(obj => {
          return <li key={obj.id}>
            <h2>{obj.title}</h2>
            <p>{obj.category}</p>
            </li>}) : ''
        }
      </ul>
    </div>
  );
}

export default Workouts;
