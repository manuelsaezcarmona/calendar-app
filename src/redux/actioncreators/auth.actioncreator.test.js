import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
// esto es para tener la ayuda de los metodos de jest
import '@testing-library/jest-dom';

import Swal from 'sweetalert2';
import { fetchConToken, fetchSinToken } from '../../helpers/fetch.helper';
import { types } from '../types/action-types';
import { eventLogout } from './event.actioncreator';
import { StartLogin } from './auth.actioncreator';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);

// Mock de localStorage
Storage.prototype.setItem = jest.fn();

// Mock de Swal
jest.mock('sweetalert2', () => ({
  fire: jest.fn()
}));

describe('Given the auth action creators', () => {
  beforeEach(() => {
    store = mockStore(initState);
    jest.clearAllMocks();
  });

  test('Given the StartLoginAction with correct Login', async () => {
    // Lo primero vamos a hacer el dispatch de la accion.
    await store.dispatch(StartLogin('jose@manu.com', '123456'));
    // Verifiquemos las acciones que se van a disparar en ese store
    const actions = store.getActions();
    // console.log(actions);

    expect(actions[0]).toEqual({
      type: '@auth/Login',
      payload: {
        uid: expect.any(String),
        username: expect.any(String)
      }
    });

    // Podemos hacer un test que se haya llamado a grabar el token a traves del localStorage
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'token',
      expect.any(String)
    );
    // Y que establezca la fecha de inicio de valided del token en el localStorage
    // como se encuentra programado en StartLogin
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'token-init-date',
      expect.any(Number)
    );

    // Como sacar el argumento por el que fue llamado una funcion de jest
    // const llamadas = localStorage.setItem.mock.calls;
    // console.log(llamadas);
    // Nos devuelve un doble arreglo seguimos la pista para llegar al dato que nos interesa
    // const token = localStorage.setItem.mock.calls[0][1];
    // console.log(token);
  });

  test('Given the StartLoginAction with INcorrect Login', async () => {
    // Lo primero vamos a hacer el dispatch de la accion.
    await store.dispatch(StartLogin('jose@manu.com', 'incorrecto'));
    // Verifiquemos las acciones que se van a disparar en ese store
    const actions = store.getActions();
    // console.log(actions);
    /* Cuando el login es incorrecto no disparamos ninguna accion solo mostramos
    un modal Swal  asi que eso es lo que tengo que evaluar */
    expect(actions).toEqual([]);
    // Ahora  espero que llame a Swal para ello voy a mockear Swal
    expect(Swal.fire).toHaveBeenCalledWith(
      'Error',
      'Password Incorrecto',
      'error'
    );
  });
  test('Given the StartLoginAction with INcorrect EMAIL', async () => {
    // Lo primero vamos a hacer el dispatch de la accion.
    await store.dispatch(StartLogin('INCORRECTO@manu.com', '123456'));
    // Verifiquemos las acciones que se van a disparar en ese store
    const actions = store.getActions();
    // console.log(actions);
    /* Cuando el login es incorrecto no disparamos ninguna accion solo mostramos
    un modal Swal  asi que eso es lo que tengo que evaluar */
    expect(actions).toEqual([]);
    // Ahora  espero que llame a Swal para ello voy a mockear Swal
    expect(Swal.fire).toHaveBeenCalledWith(
      'Error',
      'El usuario no existe con ese email',
      'error'
    );
  });
});
