import React, {useRef} from 'react';

const Workout = props => {

  const [dragging, setDragging] = props.useStickyState(false);

  const dragItem = useRef();
  const dragNode = useRef();

  const handleDragStart = (e, objIndex) => {
    const currentWorkoutIndex = Number(e.currentTarget.parentNode.parentNode.parentNode.id);
    dragItem.current = {objIndex, currentWorkoutIndex};
    console.log('Start dragging..', dragItem.current);
    dragNode.current = e.target;
    dragNode.current.addEventListener('dragend', handleDragEnd);
    setTimeout(() => {
        setDragging(true);
    }, 0);
  }

  const getDraggingStyle = (done, exercise) => {
    console.log('Inside getDraggingStyle')
    if (dragging) {

      console.log('Current drag item: ' + dragItem.current)
      console.log('Current objIndex: ' + dragItem.current.objIndex)
  
      const currentDragging = dragItem.current;
      if (currentDragging.objIndex === exercise) {
        console.log('Inside if inside getDraggingStyle')
        return done ? "workouts__exercise done current-dragging" : "workouts__exercise current-dragging";
      }
      return done ? "workouts__exercise done" : "workouts__exercise";
    }
    return done ? "workouts__exercise done" : "workouts__exercise"
  }

  const handleDragEnd = () => {
    console.log('Ending drag..')
    setDragging(false);
      if (dragNode.current !== null) {
        console.log('Inside remove event listener')
        dragNode.current.removeEventListener('dragend', handleDragEnd);
      }
      dragItem.current = null;
      dragNode.current = null;
  }


  const toggleDone = e => {
    e.stopPropagation();

    
    props.setWorkouts(props.workouts.map(workout => {
      if (workout.id.toString() === e.currentTarget.parentNode.parentNode.parentNode.id) {
        workout.workout.map(exercise => {
          if (e.currentTarget.id === exercise.id.toString()) {
            exercise.done ? exercise.done = false : exercise.done = true;
            return exercise;
          } 
          return exercise;
        });
      }
      return workout;
    }));
  };
  const deleteWorkout = e => {
    const index = props.workouts.findIndex(workout => workout.id.toString() === e.currentTarget.parentNode.parentNode.parentNode.parentNode.id);
    props.workouts.splice(index, 1);
    window.localStorage.setItem('workouts', JSON.stringify(props.workouts))
  };

  const restart = e => {
    e.stopPropagation();

    props.setWorkouts(props.workouts.map(exercises => {
      if (exercises.id.toString() === e.currentTarget.parentNode.parentNode.parentNode.parentNode.id) {
        exercises.workout.map(exercise => {
          exercise.done = false;
          return exercise;
        });
      }
      return exercises;
    }));
  }

  return (
    <div>
      <ul className="workout__list">
        {props.workout[0] ? props.workout.map((obj, objIndex) => {
          return <li draggable onDragStart={e => handleDragStart(e, objIndex)} key={obj.id} id={obj.id} onClick={e => toggleDone(e)} className={getDraggingStyle(obj.done, objIndex)} onDragEnd={handleDragEnd}>
            <h2>{obj.title}</h2>
            <p>{obj.category}</p>
            </li>}) : ''
        }
        <div className="workouts__buttons">
          <button id={props.workout.id} className="workouts__button-delete" onClick={e => deleteWorkout(e)}>DELETE</button>
          <button id={props.workout.id} className="workouts__button-restart" onClick={e => restart(e)}>RESTART</button>
        </div>
      </ul>
    </div>
  );
}

export default Workout;
