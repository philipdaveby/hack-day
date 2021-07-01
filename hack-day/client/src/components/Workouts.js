import React from 'react';

const Workouts = props => {
  // props.exercises.forEach(obj => console.log(obj))
  return (
    <div>
      <h2>Create your workout</h2>
      <p>These are all my workouts</p>
      <ul>
        {/* {props.exercises.forEach(obj => <li key={obj.id}>{obj}</li>)} */}
      </ul>
    </div>
  );
}

export default Workouts;
