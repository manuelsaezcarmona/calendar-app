/* eslint-disable arrow-body-style */
/* eslint-disable max-len */
import Swal from 'sweetalert2';
import { fetchConToken } from '../../helpers/fetch.helper';
import { prepareEvents } from '../../helpers/prepareEvents';
import { types } from '../types/action-types';

// eslint-disable-next-line no-unused-vars
const addNewEvent = (event) => ({
  type: types.eventAddnew,
  payload: event
});

// eslint-disable-next-line no-unused-vars
export const eventStartAddNew = (event) => async (dispatch, getState) => {
  const { uid, username } = getState().auth;

  // llamar al backend gracias a nuestro Token
  try {
    const resp = await fetchConToken('/events/', event, 'POST');
    const body = await resp.json();
    if (body.ok) {
      // Al evento que mande le hacen falta algunos datos de nuestro back que
      // incorporo a nuestro store

      // eslint-disable-next-line no-param-reassign
      event.id = body.eventoGuardado.id;
      // Los datos del id del usuario no los tengo como respuesta en el body
      // pero si los tengo en mi store . Llamo al metodo getState. (Ir al principio)
      // eslint-disable-next-line no-param-reassign
      event.user = {
        _id: uid,
        name: username
      };

      dispatch(addNewEvent(event));
    }
  } catch (error) {
    console.log(error);
  }
};

export const setActiveEvent = (event) => ({
  type: types.eventSetActive,
  payload: event
});

export const eventClearActiveEvent = () => ({
  type: types.eventCleanActive
});

// Ojo el evento cuando lanzamos la accion ya se encuentra actualizado
// eslint-disable-next-line no-unused-vars
const eventUpdate = (event) => ({
  type: types.eventUpdate,
  payload: event
});

export const startEventUpdate = (event) => {
  // eslint-disable-next-line no-unused-vars
  return async (dispatch) => {
    try {
      const resp = await fetchConToken(`/events/${event.id}`, event, 'PUT');
      const body = await resp.json();
      if (body.ok) {
        dispatch(eventUpdate(event));
      } else {
        Swal.fire('Error', body.msg, 'error');
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const eventDeleted = () => ({
  type: types.eventDelete
});

export const startEventDelete = () => {
  // necesito el gestState para recuperar de mi store el id del eventoactivo
  return async (dispatch, getState) => {
    const { id } = getState().calendar.activeEvent;

    try {
      // eslint-disable-next-line object-curly-newline
      const resp = await fetchConToken(`/events/${id}`, {}, 'DELETE');
      const body = await resp.json();
      if (body.ok) {
        dispatch(eventDeleted());
      } else {
        Swal.fire('Error', body.msg, 'error');
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// eslint-disable-next-line no-unused-vars
const eventLoaded = (events) => ({
  type: types.eventLoaded,
  payload: events
});

// ¿cuando disparamos esta accion, podemos dispararlo cuando el componente de calendario se recargue.
// eslint-disable-next-line no-unused-vars
export const eventStartLoading = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken('/events/');
      const body = await resp.json();

      /* tenemos que controlar que los eventos se encuentren bien construidos o mi aplicacion va a reventar.
       Debo formatear estos eventos para que sean reconocidos por nuestra aplicacion, ademas las fechas que vienen
       del back en formato texto hay que volverlas a reconvertirlas en fechas esto lo mejor es hacernos una funcion
       helper que nos ayude con ello.
       */
      const events = prepareEvents(body.eventos);

      // console.log(events);
      dispatch(eventLoaded(events));
    } catch (error) {
      console.log(error);
    }
  };
};
