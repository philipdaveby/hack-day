import React, { useEffect } from 'react';
import Workout from './Workout';
import config from '../config';
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom';

const Workouts = props => {

  const [activeWorkout, setActiveWorkout] = props.useStickyState(null);
  const history = useHistory();

  useEffect(() => {
    getWorkouts()
    .then(res => props.setWorkouts(res))
    .catch(err => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { currentUser } = useAuth();

  if (!currentUser) {
    history.push('/login');
  }

  const getWorkouts = async () => {
    // const response = await fetch(`${config.url}/api/workouts`);
    // const body = await response.json();
    // if (response.status !== 200) {
    //   throw Error(body.message);
    // }
    // return body;

    const response = await fetch(`${config.url}/api/workouts`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"user": `${currentUser.email}`})
    });
    const res = await response.json();
    
    // .then(res => {
    //   return await res.json;
    // }).catch(err => console.log(err));
    return res;
  }

  return (
    <div>
      <h2>Your workouts</h2>
      <ul className="workouts-page__list">{props.workouts ? props.workouts.map((workout, index) => {
        return <li key={Math.floor(Math.random() * 100000)} id={workout.workoutId} onClick={e => setActiveWorkout( (activeWorkout === workout.workoutId) ? null : workout.workoutId)} className="workouts__li">
           <h2>{workout.title}</h2>
           {(activeWorkout === workout.workoutId) ? <Workout getWorkouts={getWorkouts} useStickyState={props.useStickyState} workout={workout.workout} workouts={props.workouts} setWorkouts={props.setWorkouts} /> : ''}
          </li>
      }) : ''}</ul>
    </div>
  );
}

export default Workouts;
