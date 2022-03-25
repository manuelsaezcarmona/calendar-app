/* eslint-disable max-len */
import React, { useState } from 'react';
import moment from 'moment';
import 'moment/locale/es';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { messages } from '../../helpers/calendar-messages-es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Navbar } from '../ui/Navbar';
import { CalendarEvent } from './CalendarEvent';

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
    bgcolor: '#fafafa',
    notes: 'Comprar un pastel',
    user: {
      _id: '123',
      name: 'Manuel'
    }
  }
];

export function CalendarScreen() {
  // esta funcion permite personalizar el estilo de los eventos que se crean (mirar la documentacion de la libreria)

  const [lastView, setlastView] = useState(
    localStorage.getItem('lastview') || 'month'
  );
  // eslint-disable-next-line no-unused-vars
  const eventStyleGetter = (event, start, end, isSelected) => {
    // console.log(event, start, end, isSelected);
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

  const onDoubleClick = (e) => {
    // el evento me devuelve el evento-item seleccionado
    console.log(e);
  };

  const onSelectEvent = (e) => {
    console.log(e);
  };

  const onViewChange = (e) => {
    console.log(e);
    setlastView(e);
    // el evento me devuelve el nombre de la vista(semana, mes, etc..)
    localStorage.setItem('lastview', e);
  };

  return (
    <div className="calendar-screen">
      <Navbar />
      {/* La propiedad components (de la libreria Calendar) sirve para personalizar los propios eventos (items) y pasarlos por props
 para eso le paso la referencia al componente hijo . De igual manera tambien tiene este componentes eventos */}
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
        view={lastView}
      />
    </div>
  );
}
