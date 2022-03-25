import React from 'react';
import { Redirect, BrowserRouter, Switch, Route } from 'react-router-dom';

import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';

export function AppRouter() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/" component={CalendarScreen} />
          <Redirect to="/" />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
