import { types } from '../types/action-types';

export const addNewEvent = (event) => ({
  type: types.eventAddnew,
  payload: event
});

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
