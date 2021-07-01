import React, { useState } from 'react';
import ExercisePage from './components/ExercisePage';
import Nav from './components/Nav';
import Workouts from './components/Workouts';
import {
  Switch,
  Route
} from "react-router-dom";
import './App.css';

const App = props => {

  const [workout, setWorkout] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  
  return (
      <div className="App">
        <h1 className="main__header">Workout app</h1>
          <Switch>
            <Route path='/workouts'>
              <Workouts workout={workout} setWorkout={setWorkout} workouts={workouts} />
            </Route>
            <Route path='/'>
              <ExercisePage workout={workout} setWorkout={setWorkout} workouts={workouts} setWorkouts={setWorkouts} />
            </Route>
          </Switch>
        <Nav />
      </div>
  );
}

export default App;
