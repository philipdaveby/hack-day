import React, { useRef, useState } from 'react';
import config from '../config';

const Workout = props => {

  let [list, setList] = props.useStickyState(null);
  const [dragging, setDragging] = useState(false);

  list = props.workout;
  
  const dragItem = useRef();
  const dragNode = useRef();
  
  const handleDragStart = (e, objIndex) => {
    dragItem.current = objIndex;
    dragNode.current = e.target;
    dragNode.current.addEventListener('dragend', handleDragEnd);

    setTimeout(() => {
      setDragging(true);
    }, 0);
  };

  const handleDragEnter = (e, dragEnterIndex) => {
    if (e.target !== dragNode.current) {
      setList(list.splice(dragEnterIndex, 0, list.splice(dragItem.current, 1)[0]))
      dragItem.current = dragEnterIndex;
    }
  }
  
  const handleDragEnd = () => {
    setDragging(false);

    if (dragNode.current !== null) {
      dragNode.current.removeEventListener('dragend', handleDragEnd);
    }
    dragItem.current = null;
    dragNode.current = null;
  }

  const getDraggingStyle = (done, exercise) => {
    const currentItem = dragItem.current;

    if (!dragging) {
      return done ? "workouts__exercise done" : "workouts__exercise";
    }
    if (currentItem === exercise) {
      return done ? "workouts__exercise done current-dragging" : "workouts__exercise current-dragging";
    }
    return done ? "workouts__exercise done" : "workouts__exercise";
  }

  const toggleDone = e => {
    e.stopPropagation();

    props.setWorkouts(props.workouts.map(workout => {
      if (workout.workoutId.toString() !== e.currentTarget.parentNode.parentNode.parentNode.id) {
        return workout;
      }
      workout.workout.map(exercise => {
        if (e.currentTarget.id !== exercise.id.toString()) {
          return exercise
        }

        exercise.done = !exercise.done;
        return exercise;
      });

      return workout;
    }));
  };

  const deleteWorkout = async e => {
    await fetch(`${config.url}/api/workout/remove/${e.currentTarget.parentNode.parentNode.parentNode.parentNode.id}`);

    props.getWorkouts()
      .then(res => props.setWorkouts(res))
      .catch(err => console.log(err));
  };

  const restart = e => {
    e.stopPropagation();

    props.setWorkouts(props.workouts.map(exercises => {
      if (exercises.workoutId.toString() !== e.currentTarget.parentNode.parentNode.parentNode.parentNode.id) {
        return exercises
      }
      exercises.workout.map(exercise => {
        exercise.done = false;
        return exercise;
      });
      return exercises;
    }));
  }

  return (
    <div>
      <ul className="workout__list">
        {props.workout[0] ? list.map((obj, objIndex) => {
          return (
            <li
              draggable={!obj.done}
              onDragStart={e => handleDragStart(e, objIndex)}
              onDragEnter={dragging ? e => {handleDragEnter(e, objIndex)} : null}
              key={obj._id} id={obj.id}
              onClick={e => toggleDone(e)}
              className={getDraggingStyle(obj.done, objIndex)}
              >
              <h2>{obj.title} </h2>
              <p >{obj.category}</p>
            </li>
          )
        }) : ''
        }
        <div className="workouts__buttons">
          <button 
          id={props.workout.id} 
          className="workouts__button-delete" 
          onClick={e => deleteWorkout(e)}
          >DELETE</button>

          <button 
          id={props.workout.id} 
          className="workouts__button-restart" 
          onClick={e => restart(e)}
          >RESTART</button>
        </div>
      </ul>
    </div>
  );
}

export default Workout;
