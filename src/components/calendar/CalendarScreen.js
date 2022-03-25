import React from 'react';
import moment from 'moment';
import 'moment/locale/es';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { messages } from '../../helpers/calendar-messages-es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Navbar } from '../ui/Navbar';

// cambiar el idioma a moment.
moment.locale('es');

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
  // esta funcion permite personalizar el estilo de los eventos que se crean (mirar la documentacion de la libreria)
  const eventStyleGetter = (event, start, end, isSelected) => {
    console.log(event, start, end, isSelected);
    const style = {
      backgroundColor: '#367CF7',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white'
    };
    return {
      style
    };
  };
  return (
    <div className="calendar-screen">
      <Navbar />

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
}
