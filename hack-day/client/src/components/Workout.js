import React from 'react';

const Workout = props => {

  const toggleDone = e => {
    if (e.currentTarget.className === 'done') {
      e.currentTarget.className = '';
      return;
    } 
      e.currentTarget.className = 'done';
  }

  return (
    <div>
      <ul>
        {props.workout[0] ? props.workout.map(obj => {
          return <li key={obj.id} onClick={e => {
            e.stopPropagation();
            toggleDone(e);
          }}>
            <h2>{obj.title}</h2>
            <p>{obj.category}</p>
            </li>}) : ''
        }
      </ul>
    </div>
  );
}

export default Workout;
