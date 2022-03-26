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
