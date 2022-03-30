import { fetchSinToken } from '../../helpers/fetch.helper';
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
        uid: body.uid,
        username: body.username
      })
    );
  }
};
