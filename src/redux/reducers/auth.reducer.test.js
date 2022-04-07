import { chekingFinish } from '../actioncreators/auth.actioncreator';
import { types } from '../types/action-types';
import { authReducer } from './auth.reducer';

const initialState = {
  checking: true
  // uid: null,
  // name: null,
};

describe('Given the authReducer', () => {
  test('should return the state by default', () => {
    const state = authReducer(initialState, {});

    expect(state).toEqual(initialState);
  });

  test('should return state with user data', () => {
    const actionLogin = {
      type: types.authLogin,
      payload: {
        uid: '1234322',
        username: 'Trolorolo'
      }
    };
    const state = authReducer(initialState, actionLogin);

    expect(state.checking).toBe(false);
    expect(state).toEqual({
      checking: false,
      uid: '1234322',
      username: 'Trolorolo'
    });
  });

  test('types.authCheckingFinish should return checking false', () => {
    const actionCheking = {
      type: types.authCheckingFinish
    };
    const state = authReducer(initialState, actionCheking);
    expect(state).toEqual({
      checking: false
    });
  });
  test('reducer types.authLogout should be return cheking false', () => {
    const action = chekingFinish();
    const state = authReducer(initialState, action);
    expect(state.checking).toBe(false);
  });
});
