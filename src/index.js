import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import { CalendarApp } from './CalendarApp';

ReactDOM.render(
  <React.StrictMode>
    <CalendarApp />
  </React.StrictMode>,
  document.getElementById('calendar-app')
);
