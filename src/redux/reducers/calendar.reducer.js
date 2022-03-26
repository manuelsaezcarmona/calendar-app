import moment from 'moment';
import { types } from '../types/action-types';

const initialState = {
  events: [
    {
      id: new Date().getTime(),
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
    case types.eventUpdate:
      return {
        ...state,
        events: state.events.map((event) => {
          if (event.id === action.payload.id) {
            return action.payload;
          }
          return event;
        })
      };
    case types.eventDelete:
      return {
        ...state,
        events: state.events.filter(
          (event) => event.id !== state.activeEvent.id
        ),
        activeEvent: null
      };
    default:
      return state;
  }
};
