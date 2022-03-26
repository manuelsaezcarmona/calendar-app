import React from 'react';
import { Provider } from 'react-redux';
import { AppRouter } from './routers/AppRouter';
import { store } from './redux/store';

export function CalendarApp() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}
