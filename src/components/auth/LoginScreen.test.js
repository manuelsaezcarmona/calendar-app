import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
// esto es para tener la ayuda de los metodos de jest
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { LoginScreen } from './LoginScreen';

/* jest.mock('../../redux/actioncreators/event.actioncreator', () => ({
  startEventDelete: jest.fn()
})); */

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

const store = mockStore(initState);
// En el componente disparo una accion (asincrona) que ya testee en las actions.
// voy a hacer un mock de esa accion.
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <LoginScreen />
  </Provider>
);

describe('Given the LoginScreen Component', () => {
  test('should renderize & Snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
