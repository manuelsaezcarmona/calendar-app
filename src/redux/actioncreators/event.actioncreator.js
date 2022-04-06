import { fetchConToken } from '../../helpers/fetch.helper';
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
export const eventUpdate = (event) => ({
  type: types.eventUpdate,
  payload: event
});

export const eventDeleted = () => ({
  type: types.eventDelete
});
