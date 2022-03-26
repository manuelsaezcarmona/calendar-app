/* El root reducer va a ser la combinacion de todos mis reducers
  Voy a tener 3:
  1 de autenticacion
  2 de calendario
  3 de Ui
*/
import { combineReducers } from 'redux';
import { calendarReducer } from './calendar.reducer';
import { uiReducer } from './ui.reducer';

/* Combine reducer va a recibir un objeto de como va a ser el store */
export const rootReducer = combineReducers({
  ui: uiReducer,
  calendar: calendarReducer

  // TODO: CalendarReducer
  // TODO: Auth reducer
});
