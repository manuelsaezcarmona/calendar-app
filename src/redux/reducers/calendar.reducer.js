import moment from 'moment';
import { types } from '../types/action-types';

const initialState = {
  events: [
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
  ],
  activeEvent: null
};

export const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.eventSetActive:
      return {
        ...state,
        activeEvent: action.payload
      };
    case types.eventAddnew:
      return {
        ...state,
        events: [...state.events, action.payload]
      };
    case types.eventCleanActive:
      return {
        ...state,
        activeEvent: null
      };
    default:
      return state;
  }
};
