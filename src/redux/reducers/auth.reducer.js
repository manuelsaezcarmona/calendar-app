/** checking: si es en true ira a la pantalla que esté solicitando
 * si es en false ira a la pantalla de login
 */

import { types } from '../types/action-types';

const initialState = {
  checking: true
  // uid: null,
  // name: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.authLogin:
      return {
        ...state,
        checking: false,
        ...action.payload
      };

    case types.authCheckingFinish:
      return {
        ...state,
        checking: false
      };
    default:
      return state;
  }
};
