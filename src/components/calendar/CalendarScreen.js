/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import 'moment/locale/es';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { messages } from '../../helpers/calendar-messages-es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { uiOpenModal } from '../../redux/actioncreators/ui.actioncreator';
import { Navbar } from '../ui/Navbar';
import { CalendarEvent } from './CalendarEvent';
import CalendarModal from './CalendarModal';
import {
  eventClearActiveEvent,
  setActiveEvent
} from '../../redux/actioncreators/event.actioncreator';
import { FloatingBoton } from '../ui/FloatingBoton';
import { DeleteFButton } from '../ui/DeleteFButton';

// cambiar el idioma a moment.
moment.locale('es');

// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.
const localizer = momentLocalizer(moment); // or globalizeLocalizer
// mock de myEventsList

export function CalendarScreen() {
  // esta funcion permite personalizar el estilo de los eventos que se crean (mirar la documentacion de la libreria)

  const dispatch = useDispatch();

  // Leer del store los eventos.
  const { events, activeEvent } = useSelector((store) => store.calendar);

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

  // eslint-disable-next-line no-unused-vars
  const onDoubleClick = (e) => {
    // el evento me devuelve el evento-item seleccionado
    // console.log(e);
    // console.log('abrir modal');
    dispatch(uiOpenModal());
  };

  const onSelectEvent = (e) => {
    // console.log(e);
    dispatch(setActiveEvent(e));
  };

  const onViewChange = (e) => {
    console.log(e);
    setlastView(e);
    // el evento me devuelve el nombre de la vista(semana, mes, etc..)
    localStorage.setItem('lastview', e);
  };

  const handleSelectSlot = () => {
    // el Event es el objeto slot console.log(e);
    dispatch(eventClearActiveEvent());
  };

  /** Inplementacion de que desaparezca el boton de borrar cuando no este seleccionado un evento. En BigCalendar existe una prop onSelecteSlot y para que se llame
   * necesito otra propiedad que es selectable = true. Esto te da un objeto slot que puedes usar para implementar logica en tu programa.
   * Te da fecha de inicio de final. Esto te puede permitir como crear un nuevo evento al hacer click en un selector se abra la ventana de nuevo evento , etc...
   */
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
        onSelectSlot={handleSelectSlot}
        selectable
        onView={onViewChange}
        view={lastView}
      />
      <FloatingBoton />

      {activeEvent && <DeleteFButton />}

      <CalendarModal />
    </div>
  );
}
