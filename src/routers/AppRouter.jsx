import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { PublicRoute } from '../routers/PublicRoute';
import { login } from '../actions/auth';
import { JournalScreen } from '../components/journal/JournalScreen';
import { auth } from '../firebase/firebase-config';
import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';
import { loadNotes } from '../helpers/loadNotes';
import { setNotes, startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {

  const dispatch = useDispatch();
  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect( () => {
    auth.onAuthStateChanged(auth.getAuth(), ( async (user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsLoggedIn(true);
        
        dispatch(startLoadingNotes(user.uid));

      } else {
        setIsLoggedIn(false);
      }
      setChecking(false);
    }))

  }, [dispatch, setChecking, setIsLoggedIn]);

  if (checking) {
    return (
      <h1>Please Wait...</h1>
    )
  }

  return (
    <Router>
      <Switch>
        <PublicRoute
          path="/auth"
          component={AuthRouter}
          isLoggedIn={isLoggedIn}
        />
        <PrivateRoute
          exact
          path="/"
          component={JournalScreen}
          isLoggedIn={isLoggedIn}
          />
        <Redirect to="/auth/login" />
      </Switch>
    </Router>
  )
}
