import React, { useState, useEffect } from 'react';
import ExercisePage from './components/ExercisePage';
import Nav from './components/Nav';
import Workouts from './components/Workouts';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import ForgotPassword from './components/ForgotPassword';
import UpdateProfile from './components/UpdateProfile';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';

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
    <Router>
      <AuthProvider>
        <main className="App">
          <header>
            <h1 className="main__header">Workout app</h1>
          </header>
          <Switch>
            <Route path="/update-profile" component={UpdateProfile} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/profile" component={Profile} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path='/workouts'>
              <Workouts workouts={workouts} setWorkouts={setWorkouts} useStickyState={useStickyState}/>
            </Route>
            <Route path='/'>
              <ExercisePage workout={workout} setWorkout={setWorkout} workouts={workouts} setWorkouts={setWorkouts} useStickyState={useStickyState} />
            </Route>
          </Switch>
          <Nav />
        </main>
      </AuthProvider>
    </Router>
  );
}

export default App;
