import Swal from 'sweetalert2';
import { fetchConToken, fetchSinToken } from '../../helpers/fetch.helper';
import { types } from '../types/action-types';

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
  console.log(body);
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
