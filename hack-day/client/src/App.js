import React, { useState, useEffect } from 'react';
import ExercisePage from './components/ExercisePage';
import Nav from './components/Nav';
import Workouts from './components/Workouts';
import {
  Switch,
  Route
} from "react-router-dom";
import './App.css';

const App = () => {

  function useStickyState(defaultValue, key) {
    const [value, setValue] = useState(() => {
      const stickyValue = window.localStorage.getItem(key);
      return stickyValue !== null
        ? JSON.parse(stickyValue)
        : defaultValue;
    });
    useEffect(() => {
      window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    return [value, setValue];
  }

  const [workout, setWorkout] = useStickyState([], 'workout');
  const [workouts, setWorkouts] = useStickyState([], 'workouts');
  
  return (
      <div className="App">
        <h1 className="main__header">Workout app</h1>
          <Switch>
            <Route path='/workouts'>
              <Workouts workout={workout} workouts={workouts} setWorkouts={setWorkouts} useStickyState={useStickyState}/>
            </Route>
            <Route path='/'>
              <ExercisePage workout={workout} setWorkout={setWorkout} workouts={workouts} setWorkouts={setWorkouts} useStickyState={useStickyState} />
            </Route>
          </Switch>
        <Nav />
      </div>
  );
}

export default App;
