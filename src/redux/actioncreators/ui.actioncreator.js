import { types } from '../types/action-types';

export const uiOpenModal = () => ({
  type: types.uiOpenModal,
  payload: true
});

export const uiCloseModal = () => ({
  type: types.uiCloseModal,
  payload: false
});
