/** checking: si es en true ira a la pantalla que esté solicitando
 * si es en false ira a la pantalla de login
 */

const initialState = {
  checking: true
  // uid: null,
  // name: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
