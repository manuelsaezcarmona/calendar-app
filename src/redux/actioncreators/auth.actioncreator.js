/* eslint-disable max-len */
import Swal from 'sweetalert2';
import { fetchConToken, fetchSinToken } from '../../helpers/fetch.helper';
import { types } from '../types/action-types';
import { eventLogout } from './event.actioncreator';

const login = (user) => ({
  type: types.authLogin,
  payload: user
});

export const StartLogin = (email, password) => async (dispatch) => {
  const resp = await fetchSinToken(
    '/auth/login',
    {
      email,
      password
    },
    'POST'
  );
  const body = await resp.json();
  if (body.ok) {
    localStorage.setItem('token', body.token);
    localStorage.setItem('token-init-date', new Date().getTime());

    dispatch(
      login({
        uid: body.id,
        username: body.username
      })
    );
  } else {
    Swal.fire('Error', body.msg, 'error');
  }
};

export const startRegister = (email, password, username) => async (
  dispatch
) => {
  const resp = await fetchSinToken(
    '/auth/new',
    {
      username,
      email,
      password
    },
    'POST'
  );
  const body = await resp.json();

  if (body.ok) {
    localStorage.setItem('token', body.token);
    localStorage.setItem('token-init-date', new Date().getTime());
    dispatch(
      login({
        uid: body.uid,
        username: body.username
      })
    );
  } else {
    Swal.fire('Error', body.msg, 'error');
  }
};

export const chekingFinish = () => ({
  type: types.authCheckingFinish
});

export const startChecking = () => async (dispatch) => {
  // eslint-disable-next-line object-curly-newline
  const resp = await fetchConToken('/auth/renew', {}, 'GET');
  const body = await resp.json();
  //  console.log(body);
  if (body.ok) {
    localStorage.setItem('token', body.token);
    localStorage.setItem('token-init-date', new Date().getTime());
    dispatch(
      login({
        uid: body.uid,
        username: body.username
      })
    );
  } else {
    dispatch(chekingFinish());
  }
};

/** Para hacer logout lo que necesito es  borrar la informacion del localStorage y tambien quitar esa informacion del state */

export const logout = () => ({
  type: types.authLogout
});

/** Aunque sea al localStorage es un procedimiento que llamo asi que hago uso del thunk */
export const startlogout = () => (dispatch) => {
  localStorage.clear();
  dispatch(eventLogout());
  dispatch(logout());
};
