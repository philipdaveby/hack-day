import React from 'react';
import ExercisePage from './components/ExercisePage';
import Nav from './components/Nav';
import Workouts from './components/Workouts';
import {
  Switch,
  Route
} from "react-router-dom";

import './App.css';

const App = () => {
  
  return (
      <div className="App">
        <Nav />
        <h1>Workout app</h1>
          <Switch>
          <Route path='/workout'>
            <Workouts />
          </Route>
          <Route path='/'>
            <ExercisePage />
          </Route>
        </Switch>
      </div>
  );
}

export default App;
