import { uiCloseModal, uiOpenModal } from '../actioncreators/ui.actioncreator';
import { uiReducer } from './ui.reducer';

const initialState = {
  modalOpen: false
};

describe('Given the UI reducer', () => {
  test('should first the initial state ', () => {
    const state = uiReducer(initialState, {});

    expect(state).toEqual(initialState);
  });

  test('should open & close modal', () => {
    // Podemos definir la accion o en el test
    // const action = {type: types.uiOpenmodal, payload: true}
    // O Podemos plantear una accion que ejecute un actioncreator en vez de definirla nosotros
    const modalOpen = uiOpenModal();
    const state = uiReducer(initialState, modalOpen);
    // console.log(state);
    expect(state.modalOpen).toBe(true);
    // Ahora vamos a hacer el test de close modal
    const modalClose = uiCloseModal();
    const stateClose = uiReducer(state, modalClose);
    // console.log(state);
    expect(stateClose).toEqual({
      modalOpen: false
    });
  });
});
