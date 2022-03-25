import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { Navbar } from '../ui/Navbar';

// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.
const localizer = momentLocalizer(moment); // or globalizeLocalizer
// mock de myEventsList
const events = [
  {
    title: 'Mi tarea',
    start: moment().toDate(),
    end: moment()
      .add(2, 'hours')
      .toDate(),
    bgcolor: '#fafafa'
  }
];

export function CalendarScreen() {
  return (
    <div className="calendar-screen">
      <Navbar />
      <h1>CalendarScreen</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  );
}
