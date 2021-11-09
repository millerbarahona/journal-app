import React from 'react'
import { Switch, Route, Redirect } from "react-router-dom";
import { LoginScreen } from '../components/auth/LoginScreen';
import { Register } from '../components/auth/Register';

export const AuthRouter = () => {
  return (
    <div className="auth__main"> {/*auth nos ayuda a saber en que archivo estan los estilos */}
      <div className="auth__box-container">
        <Switch>
          <Route exact path="/auth/login" component={LoginScreen} />
          <Route exact path="/auth/register" component={Register} />
          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </div>
  )
}
